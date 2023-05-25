const UserModel = require("../models/user")
const validator = require('validator');
const { createJWT } = require("../helpers");

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
            const new_user = await UserModel.create({full_name, email, password, auth_type})
            console.log(new_user)

            return res.status(201).json({success: "Account Created", data: new_user})

        } else {
            if (!full_name, !email) {
                return res.status(404).json({ error: "One or more fields empty" })
            }

            // Validate Email
            if (!validator.isEmail(email)) {
                return res.status(404).json({ error: "Invalid Email" })
            }

            const new_user = await UserModel.create({full_name, email, auth_type})
            console.log(new_user)

            return res.status(201).json({success: "Account Created", data: new_user})
        }
    } catch (err) {
        if(err.code === 11000){
            return res.status(404).json({ error: "Email already exists" })
        }else{
            return res.status(500).json({error: "An error occurred!"})
        }
    }
}


const login = async (req, res) =>{

    try{
        let { email, password } = req.body

        let user = await UserModel.login(email, password)
        let tk = createJWT(user._id)

        res.cookie('__Secure-jwt', _tk, {
            maxAge: 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        return user
        
    }catch(err){
        if(err === "account not found"){
            return res.status(400).json({error:"Account not found!"})
        }
        return res.status(500).json({error:"An error occurred!"})
        
    }
}

module.exports = {
    signup,
    login
}