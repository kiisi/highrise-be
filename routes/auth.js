const router = require("express").Router()
const authController = require("../controllers/auth")

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

module.exports = router
