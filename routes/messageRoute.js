const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController')
const authenticate = require('../middlewares/authenticate')

router.get('/:id', messageController.getMessage)
router.post('/:id', messageController.createMessage)

module.exports = router;