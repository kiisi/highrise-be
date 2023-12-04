import validator from 'validator';
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js"
import { OtpModel } from "../models/otp.js";
import bcrypt from "bcrypt"
import { createJWT } from '../helpers/index.js';

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
                return res.status(400).json({ error: "Email already exists" })
            }

            let new_user = await UserModel.create({ full_name, email, password, auth_type })
            new_user.password = undefined

            return res.status(201).json({
                success: "Account Created",
                data: {
                    email: new_user.email,
                }
            })
        }

        // Google Auth
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

        return res.status(201).json({
            success: "Account Created",
            data: {
                email: new_user.email,
            }
        })

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

                    user.password = undefined
                    const _tk = createJWT(user._id)

                    return res.status(200).json({
                        success: "Login Successful",
                        token: _tk
                    })
                }
            }
        }

        // Google Authentication
        if (auth_type === "google") {

            const user = await UserModel.findOne({ email })

            if (user) {

                user.password = undefined
                const _tk = createJWT(user._id)

                return res.status(200).json({
                    success: "Login Successful",
                    token: _tk
                })
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

    user.password = undefined

    return res.status(200).json({ success: 'Authorized', data: user })
}

export {
    signup,
    login,
    verifyUser,
}