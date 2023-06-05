const router = require("express").Router()
const documentsController = require("../controllers/documents")


/*
 * @route POST /documents/change-of-name/uploads
 * @access public
 * @returns {object} 
*/

router.post("/change-of-name/uploads", documentsController.changeName)

/*
 * @route POST /documents/loss-of-docs/uploads
 * @access public
 * @returns {object} 
*/

router.post("/loss-of-docs/uploads", documentsController.lossDocs)

/*
 * @route POST /documents/public-notice/uploads
 * @access public
 * @returns {object} 
*/

router.post("/public-notice/uploads", documentsController.publicNotice)

/*
 * @route POST /documents/affidavit/uploads
 * @access public
 * @returns {object} 
*/

router.post("/affidavit/uploads", documentsController.affidavit)

module.exports = router