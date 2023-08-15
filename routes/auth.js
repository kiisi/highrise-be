import express from "express"
const router = express.Router()
import * as authController from "../controllers/auth.js"

/*
 * @route POST /auth/signup
 * @access public
 * @body {string} email
 * @body {string} auth_type
 * @body {string} password
 * @body {string} full_name
 * @returns {object} 
*/

router.post("/signup", authController.signup)

/*
 * @route POST /auth/signup
 * @access public
 * @body {string} email
 * @body {string} password
 * @returns {object} 
*/

router.post("/login", authController.login)

/*
 * @route GET /auth/verify-user
 * @access public 
*/

router.get("/verify-user", authController.verifyUser)

/*
 * @route GET /auth/logout
 * @access public
*/

router.get("/logout", authController.logout)

/*
 * @route GET /auth/send-otp
 * @access public
*/

router.post("/send-otp", authController.sendOtp)

/*
 * @route GET /auth/verify-otp
 * @access public
*/

router.post("/verify-otp", authController.verifyOtp)

export default router
