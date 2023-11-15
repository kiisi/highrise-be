import express from "express"
const router = express.Router()
import * as notificationController from "../controllers/notification.js"
import { protectedResources } from "../middleware/protectedResources.js"

router.post('/notification', protectedResources, notificationController.notify)

export default router