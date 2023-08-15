import express from "express"
const router = express.Router()
import * as notificationController from "../controllers/notification.js"

router.post('/notification', notificationController.notify)

export default router