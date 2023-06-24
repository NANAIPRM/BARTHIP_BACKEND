const { Room } = require('../models')

exports.createRoom = (req, res, next) => {
    Room.create().then( rs => {
        res.json(rs)
        
    }).then(rs => {
        Room.findOne({
            where:{id: rs.id}
        }).then(ky => {
            res.json(ky)
        })
    })
    .catch(next)
}


exports.getRoom =  (req, res, next) => {
    Room.findAll().then( rs => {
        res.json(rs)
    }).catch(next)
}
