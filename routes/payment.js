import express from "express"
const router = express.Router()
import * as paymentController from "../controllers/payment.js"


router.post('/checkout/change-of-name', paymentController.changeNamePaymentVerification)

router.post('/checkout/correction-of-name-age', paymentController.correctionNameAgePaymentVerification)

router.post('/checkout/loss-of-docs', paymentController.lossDocsPaymentVerification)

router.post('/checkout/public-notice', paymentController.publicNoticePaymentVerification)

router.post('/checkout/affidavit', paymentController.affidavitPaymentVerification)

router.post('/checkout/verification', paymentController.verifyCode)

router.post('/checkout/verification-payment', paymentController.verifyPayment)

export default router