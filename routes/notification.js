const router = require("express").Router()
const notificationController = require("../controllers/notification")

router.post('/notification', notificationController.notify)

module.exports = router