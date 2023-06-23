const express = require('express')
const googleController = require('../controllers/google-controller')
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.get('/me', authController.getMe)
router.post('/glogin', googleController.googleLogin)

module.exports = router
