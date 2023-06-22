const { Message } = require('../models')

exports.getMessage =  (req, res, next) => {
    const {id} = req.params
    Message.findAll({
        where:{roomId : id}
    }).then( rs => {
        res.json(rs)
    }).catch(next)
}

exports.createMessage = (req, res, next) => {
    const {message, userId} = req.body
    const {id} = req.params
    Message.create({
        message,
        roomId:id,
        userId
    }).then( rs => {
        res.json(rs)
    }).catch(next)
}