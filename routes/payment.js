const router = require("express").Router()
const paymentController = require("../controllers/payment")

router.post('/checkout/change-of-name', paymentController.changeNamePaymentVerification)

router.post('/checkout/loss-of-docs', paymentController.lossDocsPaymentVerification)

router.post('/checkout/public-notice', paymentController.publicNoticePaymentVerification)

router.post('/checkout/affidavit', paymentController.affidavitPaymentVerification)

router.post('/checkout/verification', paymentController.verifyCode)

router.post('/checkout/verification-payment', paymentController.verifyPayment)

module.exports = router