const createError = require('../utils/create-error')
const uploadService = require('../services/upload-service')
const { Avatar, Drink, Hat, UserHat, UserAvatar, UserDrink } = require('../models')

// ADD PRODUCT
exports.AddAvatar = async (req, res, next) => {
    try {
        const { name, price } = req.body
        const image = await (
            await uploadService.upload(req.file.path)
        ).secure_url

        const createdAvatar = await Avatar.create({
            name,
            image,
            price,
        })

        res.status(200).json({ product: createdAvatar })
    } catch (err) {
        next(err)
    }
}
exports.AddDrink = async (req, res, next) => {
    try {
        const { name, price } = req.body
        const image = await (
            await uploadService.upload(req.file.path)
        ).secure_url

        const createdDrink = await Drink.create({
            name,
            image,
            price,
        })

        res.status(200).json({ product: createdDrink })
    } catch (err) {
        next(err)
    }
}
exports.AddHat = async (req, res, next) => {
    try {
        const { name, price } = req.body
        const image = await (
            await uploadService.upload(req.file.path)
        ).secure_url

        const createdHat = await Hat.create({
            name,
            image,
            price,
        })

        res.status(200).json({ product: createdHat })
    } catch (err) {
        next(err)
    }
}

// EDIT PRODUCT
exports.EditAvatar = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const image = req.file
            ? (await uploadService.upload(req.file.path)).secure_url
            : undefined

        const updateData = {}
        if (name) {
            updateData.name = name
        }
        if (price) {
            updateData.price = price
        }
        if (image) {
            updateData.image = image
        }

        await Avatar.update(updateData, {
            where: { id: id },
        })

        const updatedAvatar = await Avatar.findByPk(id)

        if (!updatedAvatar) {
            throw createError(404, 'Avatar not found')
        }

        res.status(200).json({ avatar: updatedAvatar })
    } catch (err) {
        next(err)
    }
}
exports.EditHat = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const image = req.file
            ? (await uploadService.upload(req.file.path)).secure_url
            : undefined

        const updateData = {}
        if (name) {
            updateData.name = name
        }
        if (price) {
            updateData.price = price
        }
        if (image) {
            updateData.image = image
        }

        await Hat.update(updateData, {
            where: { id: id },
        })

        const updatedHat = await Hat.findByPk(id)

        if (!updatedHat) {
            throw createError(404, 'Hat not found')
        }

        res.status(200).json({ hat: updatedHat })
    } catch (err) {
        next(err)
    }
}
exports.EditDrink = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, price } = req.body

        const image = req.file
            ? (await uploadService.upload(req.file.path)).secure_url
            : undefined

        const updateData = {}
        if (name) {
            updateData.name = name
        }
        if (price) {
            updateData.price = price
        }
        if (image) {
            updateData.image = image
        }

        await Drink.update(updateData, {
            where: { id: id },
        })

        const updatedDrink = await Drink.findByPk(id)

        if (!updatedDrink) {
            throw createError(404, 'Drink not found')
        }

        res.status(200).json({ drink: updatedDrink })
    } catch (err) {
        next(err)
    }
}

// DELETE Product
exports.DeleteAvatar = async (req, res, next) => {
    try {
        const { id } = req.params

        const deletedAvatar = await Avatar.destroy({ where: { id: id } })

        if (deletedAvatar === 0) {
            throw createError(404, 'Avatar not found')
        }

        res.status(200).json({ message: 'Avatar deleted successfully' })
    } catch (err) {
        next(err)
    }
}
exports.DeleteHat = async (req, res, next) => {
    try {
        const { hatId } = req.params

        const deletedHat = await Hat.destroy({ where: { id: hatId } })

        if (deletedHat === 0) {
            throw createError(404, 'Hat not found')
        }

        res.status(200).json({ message: 'Hat deleted successfully' })
    } catch (err) {
        next(err)
    }
}
exports.DeleteDrink = async (req, res, next) => {
    try {
        const { drinkId } = req.params

        const deletedDrink = await Drink.destroy({ where: { id: drinkId } })

        if (deletedDrink === 0) {
            throw createError(404, 'Drink not found')
        }

        res.status(200).json({ message: 'Drink deleted successfully' })
    } catch (err) {
        next(err)
    }
}

// GET ALL Product

// exports.GetAllAvatars = async (req, res, next) => {
//     try {
//         const avatars = await Avatar.findAll()

//         res.status(200).json({ avatars })
//     } catch (err) {
//         next(err)
//     }
// }
// exports.GetAllHats = async (req, res, next) => {
//     try {
//         const hats = await Hat.findAll()

//         res.status(200).json({ hats })
//     } catch (err) {
//         next(err)
//     }
// }
// exports.GetAllDrinks = async (req, res, next) => {
//     try {
//         const drinks = await Drink.findAll()

//         res.status(200).json({ drinks })
//     } catch (err) {
//         next(err)
//     }
// }

// GET Product By ProductId

exports.GetAvatarById = async (req, res, next) => {
    try {
        const { avatarId } = req.params

        const avatar = await Avatar.findByPk(avatarId)

        if (!avatar) {
            throw createError(404, 'Avatar not found')
        }

        res.status(200).json({ avatar })
    } catch (err) {
        next(err)
    }
}
exports.GetHatById = async (req, res, next) => {
    try {
        const { hatId } = req.params

        const hat = await Hat.findByPk(hatId)

        if (!hat) {
            throw createError(404, 'Hat not found')
        }

        res.status(200).json({ hat })
    } catch (err) {
        next(err)
    }
}
exports.GetDrinkById = async (req, res, next) => {
    try {
        const { drinkId } = req.params

        const drink = await Drink.findByPk(drinkId)

        if (!drink) {
            throw createError(404, 'Drink not found')
        }

        res.status(200).json({ drink })
    } catch (err) {
        next(err)
    }
}

// AddProductToCart 

exports.AddHatByUserId = (req, res, next) => {

    const { hatId } = req.body
    UserHat.create({
        hatId,
        userId: req.user.id
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.AddDrinkByUserId = (req, res, next) => {
    const { drinkId } = req.body
    UserDrink.create({
        drinkId,
        userId: req.user.id
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

exports.AddAvatarByUserId = (req, res, next) => {
    const { avatarId } = req.body
    UserAvatar.create({
        avatarId,
        userId: req.user.id
    }).then(rs => {
        res.json(rs)
    }).catch(next)
}

// Get All Product

exports.GetAllHats = (req, res, next) => {
    Hat.findAll({
        include: [{
            model: UserHat, attributes: ["userId"]
        }]
    }).then(rs=>{
        res.json(rs)
    }).catch(next)
}

exports.GetAllDrinks = (req, res, next) => {
    Drink.findAll({
        include: [{
            model: UserDrink, attributes: ["userId"]
        }]
    }).then(rs=>{
        res.json(rs)
    }).catch(next)
}

exports.GetAllAvatars = (req, res, next) => {
    Avatar.findAll({
        include: [{
            model: UserAvatar, attributes: ["userId"]
        }]
    }).then(rs=>{
        res.json(rs)
    }).catch(next)
}
