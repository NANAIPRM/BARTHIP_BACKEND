const express = require('express')
const productController = require('../controllers/product-controller')
const upload = require('../middlewares/upload')
const router = express.Router()

// Add Product
router.post('/avatar', upload.single('image'), productController.AddAvatar)
router.post('/drink', upload.single('image'), productController.AddDrink)
router.post('/hat', upload.single('image'), productController.AddHat)

// Edit Product
router.patch(
    '/avatar/:id',
    upload.single('image'),
    productController.EditAvatar
)
router.patch('/hat/:id', upload.single('image'), productController.EditHat)
router.patch('/drink/:id', upload.single('image'), productController.EditDrink)

// Delete Product
router.delete('/avatar/:id', productController.DeleteAvatar)
router.delete('/hat/:id', productController.DeleteHat)
router.delete('/drink/:id', productController.DeleteHat)

module.exports = router
