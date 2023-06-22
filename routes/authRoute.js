const express = require('express')
const authController = require('../controllers/authController.js')
const authenticate = require('../middlewares/authenticate')
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/getme', authenticate, authController.getMe)
router.get('/', authController.getAllUsers)


module.exports = router