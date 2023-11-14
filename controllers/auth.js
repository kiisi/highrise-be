import validator from 'validator';
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js"
import { OtpModel } from "../models/otp.js";
import bcrypt from "bcrypt"
import { createJWT, sendOtpEmail } from '../helpers/index.js';

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

            // Check if email exist
            let emailExist = await UserModel.findOne({ email })

            if (emailExist) {
                return res.status(404).json({ error: "Email already exists" })
            }

            let new_user = await UserModel.create({ full_name, email, password, auth_type })
            new_user.password = undefined

            return res.status(201).json({ success: "Account Created", data: { email: new_user.email, verifiedEmail: new_user.verified_email } })

        } else {
            if (!full_name, !email) {
                return res.status(404).json({ error: "One or more fields empty" })
            }

            // Validate Email
            if (!validator.isEmail(email)) {
                return res.status(404).json({ error: "Invalid Email" })
            }

            // Check if email exist

            let emailExist = await UserModel.findOne({ email })

            if (emailExist) {
                return res.status(404).json({ error: "Email already exists" })
            }

            let new_user = await UserModel.create({ full_name, email, auth_type })

            return res.status(201).json({ success: "Account Created", data: { email: new_user.email, verifiedEmail: new_user.verified_email } })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "An error occurred!" })
    }
}


const login = async (req, res) => {

    try {

        let { email, password, auth_type } = req.body

        // Validate Email
        if (!validator.isEmail(email)) {
            return res.status(401).json({ error: "Invalid Email" })
        }


        // Password Authentication
        if (auth_type === "password") {

            if (password.trim() === '') {
                return res.status(401).json({ error: "Password is required!" })
            }

            const user = await UserModel.findOne({ email })

            if (user) {

                let isAuthenticated = await bcrypt.compare(password, user.password)

                if (isAuthenticated) {

                    if (user.verified_email) {

                        user.password = undefined

                        const _tk = createJWT(user._id)

                        return res.status(200).json({ success: "Login Successful", verifiedEmail: true, token: _tk })

                    } else {
                        return res.status(401).json({ error: "Account has not been verified!", verifiedEmail: false, data: { email: user.email } })
                    }
                }
            }
        }

        // Google Authentication
        if (auth_type === "google") {

            const user = await UserModel.findOne({ email })

            if (user) {
                if (user.verified_email) {

                    user.password = undefined

                    const _tk = createJWT(user._id)

                    return res.status(200).json({ success: "Login Successful", verifiedEmail: true, token: _tk })
                }
                else {
                    return res.status(401).json({
                        error: "Account has not been verified!",
                        verifiedEmail: false,
                        data: {
                            email: user.email
                        }
                    })
                }
            }
        }

        throw Error("account not found")

    } catch (err) {

        if (err.message === "account not found") {
            return res.status(400).json({ error: "Account not found!" })
        }
        console.log(err)

        return res.status(500).json({ error: "An error occurred!" })
    }
}

const verifyUser = (req, res) => {

    const user = req.dbUser

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    if (!user.verified_email) {
        user.password = undefined
        return res.status(401)
            .json({
                error: "Account has not been verified!",
                verifiedEmail: false,
                data: { email: user.email }
            })
    }

    return res.status(200).json({ success: 'Authorized', verifiedEmail: true, data: user })
}

const logout = (req, res) => {
    res.cookie('jwt', ' ', {
        maxAge: 1,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    })
    res.status(200).json({ success: true })
}

const sendOtp = async (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.status(403).json({ error: "Email is required for verification!" })
    }

    // Validate Email
    if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Invalid Email" })
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    try {

        const otp = getRandomInt(1000, 10000)
        const recentOtps = await OtpModel.find({ email })

        if (recentOtps.length !== 0) {

            const recentOtpExpiry = recentOtps[recentOtps.length - 1].expires_at

            let remaining_secs = Math.trunc((recentOtpExpiry - Date.now()) / (1000))

            if (remaining_secs > 0) {

                return res.status(403).json({ error: "Please wait before requesting another OTP verification code.", time: remaining_secs })

            } else {

                const otp_expiry = Date.now() + 600000

                await OtpModel.create({ email, otp, expires_at: otp_expiry })
                sendOtpEmail(email, otp)

                return res.status(200).json({ success: `Otp sent to ${email}` })
            }

        } else {

            const otp_expiry = Date.now() + 600000

            await OtpModel.create({ email, otp, expires_at: otp_expiry })
            await sendOtpEmail(email, otp)

            return res.status(200).json({ success: `Otp sent to ${email}` })
        }

    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: "Otp not sent" })
    }
}

const verifyOtp = async (req, res) => {

    const { email, otp } = req.body

    if (!email) {
        return res.status(403).json({ error: "Email is required for verification!" })
    }
    if (!otp) {
        return res.status(403).json({ error: "OTP is required for verification!" })
    }

    try {

        const user = UserModel.findOne({ email })

        if (user.verified_email) {
            return res.status(200).json({ success: "Email has been verified!" })
        }

        if (user) {

            const otpData = await OtpModel.find({ email })

            if (otp === otpData[otpData.length - 1].otp) {
                await UserModel.updateOne({ email }, {
                    verified_email: true,
                });
                return res.status(200).json({ success: "Email verification successful" })
            } else {
                return res.status(403).json({ error: "OTP verification failed!" })
            }

        } else {
            return res.status(403).json({ error: "OTP verification failed!" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "OTP verification error!" })
    }
}


export {
    signup,
    login,
    verifyUser,
    logout,
    sendOtp,
    verifyOtp
}