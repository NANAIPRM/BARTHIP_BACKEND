const express = require('express')
const googleController = require('../controllers/google-controller')
const authController = require('../controllers/auth-controller')
const authenticateMiddleWare = require('../middlewares/authenticate')

const router = express.Router()

router.get('/me', authenticateMiddleWare, authController.getMe)
router.post('/glogin', googleController.googleLogin)
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
