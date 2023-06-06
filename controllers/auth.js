const UserModel = require("../models/user")
const validator = require('validator');
const { createJWT, sendOtpEmail } = require("../helpers");
const jwt = require("jsonwebtoken");
const otpModel = require("../models/otp");

const signup = async (req, res) => {

    try {
        let { full_name, email, password, auth_type } = req.body

        if (auth_type !== "google" && auth_type !== "password") {
            return res.status(400).json({ error: "No Authentication Mode" })
        }

        if (auth_type === "password") {
            if (!full_name, !email, !password) {
                return res.status(404).json({ error: "One or more fields empty" })
            }

            // Validate Email
            if (!validator.isEmail(email)) {
                return res.status(404).json({ error: "Invalid Email" })
            }
            let new_user = await UserModel.create({full_name, email, password, auth_type})
            new_user.password = undefined

            return res.status(201).json({success: "Account Created", data:{email: new_user, verified_email: new_user.verified_email } })

        } else {
            if (!full_name, !email) {
                return res.status(404).json({ error: "One or more fields empty" })
            }

            // Validate Email
            if (!validator.isEmail(email)) {
                return res.status(404).json({ error: "Invalid Email" })
            }

            let new_user = await UserModel.create({full_name, email, auth_type})

            return res.status(201).json({success: "Account Created", data:{email: new_user.email, verified_email: new_user.verified_email } })
        }
    } catch (err) {
        if(err.code === 11000){
            return res.status(404).json({ error: "Email already exists" })
        }
        console.log(err)
        return res.status(500).json({error: "An error occurred!"})
    }
}


const login = async (req, res) =>{

    try{
        let { email, password, auth_type } = req.body

        if(auth_type === "password"){

            // Validate Email
            if (!validator.isEmail(email)) {
                return res.status(404).json({ error: "Invalid Email" })
            }
            
            // Validate Password
            if(password.trim() === ''){
                return res.status(404).json({ error: "Password is required!" })
            }
        }

        let user = await UserModel.login(email, password, auth_type)
        let _tk = createJWT(user._id)

        res.cookie('jwt', _tk, {
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        return res.status(200).json({success: "Login Successful", data: user})
        
    }catch(err){
        
        if(err.message === "account not found"){
            return res.status(400).json({error:"Account not found!"})
        }
        
        return res.status(500).json({error:"An error occurred!"})
        
    }
}

const verifyUser = (req, res, next) =>{
    const token = req.cookies['jwt']
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) =>{
            if(err){
                console.log(err)
                res.status(200).json({error: "Unauthorized"})
            }else{
                let user = await UserModel.findById(decodedToken.id);
                if(user){
                    if(user.verified_email){
                        user.password = undefined
                        res.status(200).json({success: 'Authorized', data: user})
                    }else{
                        res.status(200).json({error: 'Unauthorized', data: user})
                    }
                }else{
                    res.status(200).json({error: 'Unauthorized', data: user})
                }
                next()
            }
        })
    }else{
        res.status(200).json({error: "Unauthorized"})
        next()
    }
}

const logout = (req, res) =>{
    res.cookie('jwt', ' ', {
        maxAge: 1, 
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })
    res.status(200).json({success: true})
}

const sendOtp = async (req, res) => {

    const { email } = req.body

    if(!email){
        return res.status(403).json({error: "Email is required for verification!"})
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }

    try {

        const otp = getRandomInt(1000, 10000)
        const recentOtps = await otpModel.find({email})

        if(recentOtps.length !== 0){

            const recentOtpExpiry = recentOtps[recentOtps.length - 1].expires_at

            let remaining_secs = Math.trunc((recentOtpExpiry - Date.now()) / (1000))

            if(remaining_secs > 0){

                return res.status(403).json({error: "Please wait before requesting another OTP verification code.", time: remaining_secs})

            }else{

                const otp_expiry = Date.now() + 120000

                await otpModel.create({email, otp, expires_at: otp_expiry})
                sendOtpEmail(email, otp)
                
                return res.status(200).json({success: `Otp sent to ${email}`})
            }

        }else{

            const otp_expiry = Date.now() + 120000

            await otpModel.create({email, otp, expires_at: otp_expiry})
            sendOtpEmail(email, otp)

            return res.status(200).json({success: `Otp sent to ${email}`})
        }
        
    }catch(err){
        console.log(err)
        return res.status(401).json({error: "Otp not sent"})
    }
}

const verifyOtp = async (req, res) => {

    const { email, otp } = req.body

    if(!email){
        return res.status(403).json({error: "Email is required for verification!"})
    }
    if(!otp){
        return res.status(403).json({error: "OTP is required for verification!"})
    }

    try {

        const user = UserModel.findOne({email})

        if(user){

            const otpData = await otpModel.find({email})
            
            if(otp === otpData[otpData.length - 1].otp){
                return res.status(200).json({success: "Email verification successful"})
            }else{
                return res.status(403).json({error: "OTP verification failed!"})
            }
            
        }else{
            return res.status(403).json({error: "OTP verification failed!"})
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({error: "OTP verification error!"})
    }
}



module.exports = {
    signup,
    login,
    verifyUser,
    logout,
    sendOtp,
    verifyOtp
}