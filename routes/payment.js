const router = require("express").Router()
const paymentController = require("../controllers/payment")

router.post('/checkout/change-of-name', paymentController.verifyPayment)

module.exports = router