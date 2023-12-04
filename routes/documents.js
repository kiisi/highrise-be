import express from "express"
const router = express.Router()
import * as documentsController from "../controllers/documents.js"


/*
 * @route POST /documents/change-of-name/uploads
 * @access public
 * @returns {object} 
*/

router.post("/change-of-name/uploads", documentsController.changeName)

/*
 * @route POST /documents/correction-of-name-age/uploads
 * @access public
 * @returns {object} 
*/

router.post("/correction-of-name-age/uploads", documentsController.correctionNameAge)

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

router.get("/all-docs", documentsController.allDocs)

export default router