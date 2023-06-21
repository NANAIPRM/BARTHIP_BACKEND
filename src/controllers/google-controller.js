const createError = require('../utils/create-error')
const tokenService = require('../services/token-service')
const jwtDecode = require('jwt-decode')

exports.googleLogin = async (req, res, next) => {
    try {
        const { credential } = req.body
        const isToken = await tokenService.verifyGoogle(credential)
        if (!isToken) throw new createError('Invalid Google-Token ', 401)
        const googleUser = jwtDecode(credential)
    } catch (err) {
        next(err)
    }
}
