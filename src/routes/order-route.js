const express = require('express')
const paymentController = require('../controllers/payment-controller')
const router = express.Router()



router.post('/checkout', paymentController.checkout)
router.get('/payment', paymentController.payment)

module.exports = router
