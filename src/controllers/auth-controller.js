const {
    validateRegister,
    validateLogin,
} = require('../validators/auth-validator')
const bcryptService = require('../services/bcrypt-service')
const tokenService = require('../services/token-service')
const createError = require('../utils/create-error')
const { User } = require('../models')

exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user })
}

exports.register = async (req, res, next) => {
    try {
        // Validate
        const value = validateRegister(req.body)

        const isUserExist = await User.findOne({
            where: {
                email: value.email,
            },
        })

        if (isUserExist) {
            throw createError('Email address already in use')
        }

        // Hash password
        value.password = await bcryptService.hash(value.password)

        // Insert to users table
        let user
        user = await User.create({
            nickname: value.nickname,
            email: value.email,
            password: value.password,
        })

        // Sign token and send response
        const accessToken = tokenService.sign({ id: user.id })
        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const value = validateLogin(req.body)
        const user = await await User.findOne({
            where: {
                email: value.email,
            },
        })
        if (!user) {
            createError('Please register !!!', 400)
        }
        const isCorrect = await bcryptService.compare(
            value.password,
            user.password
        )
        if (!isCorrect) {
            createError('Wrong passwod !!!', 400)
        }
        const accessToken = tokenService.sign({ id: user.id })
        res.status(200).json({ accessToken })
    } catch (err) {
        next(err)
    }
}
