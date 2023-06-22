const createError = require('../utils/create-error')
const tokenService = require('../services/token-service')
const jwtDecode = require('jwt-decode')
const User = require('../models')

exports.googleLogin = async (req, res, next) => {
    try {
        const { credential } = req.body
        const isToken = await tokenService.verifyGoogle(credential)
        if (!isToken) throw new createError('Invalid Google-Token ', 401)
        const googleUser = jwtDecode(credential)
        const user = await User.findOne({
            where: {
                email: googleUser.email,
            },
        })
        let newUser
        if (!user) {
            newUser = await User.create({
                email: googleUser.email,
                googleToken: credential,
            })
        }
        const token = user
            ? tokenService.sign({ id: user.id })
            : tokenService.sign({ id: newUser.id })
        res.status(200).json({ token })
    } catch (err) {
        next(err)
    }
}
