const router = require("express").Router()
const authController = require("../controllers/auth")

/*
 * @route POST /auth/signup
 * @access public
 * @body {string} email
 * @body {string} auth_type
 * @body {string} password
 * @body {string} full_name
 * @returns {object} {message, data, status}
*/

router.post("/signup", authController.signup)

module.exports = router
