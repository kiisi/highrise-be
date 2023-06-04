const router = require("express").Router()
const documentsController = require("../controllers/documents")


/*
 * @route POST /documents/change-of-name/uploads
 * @access public
 * @body {string} old_name
 * @body {string} new_name
 * @returns {object} 
*/

router.post("/change-of-name/uploads", documentsController.changeName)

module.exports = router