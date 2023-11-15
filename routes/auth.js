import express from "express"
const router = express.Router()
import * as authController from "../controllers/auth.js"
import { protectedResources } from "../middleware/protectedResources.js"

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

router.get("/verify-user", protectedResources, authController.verifyUser)

/*
 * @route GET /auth/logout
 * @access public
*/

export default router
