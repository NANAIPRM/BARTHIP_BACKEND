const path = require('path')
const cloudinary = require('../config/cloudinary')

exports.upload = (path) => cloudinary.uploader.upload(path)
