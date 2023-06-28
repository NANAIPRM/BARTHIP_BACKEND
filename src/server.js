const server = require('./app')
const { Server } = require('socket.io')
const { cloudinary_js_config } = require('./config/cloudinary')

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
})

let roomOccupancy = {}
const joinedRooms = []
console.log('----', joinedRooms)
const onlineUser = {}

io.use((socket, next) => {
    const userId = socket.handshake.auth.id
    console.log(socket.id)
    console.log(userId)
    if (!userId) {
        console.log('error connect')
        return next(new Error('invalid username'))
    }
    socket.userId = userId
    onlineUser[userId] = socket.id
    console.log(onlineUser)
    console.log(`User connected ${socket.id}`)
    next()
})

io.on('connection', (socket) => {
    console.log(onlineUser)
    io.emit('onlinefriends', onlineUser)
    socket.on('room', (data) => {
        const room = data
        const occupants = roomOccupancy[room] || 0
        joinedRooms.push(room)

        if (occupants < 2) {
            socket.join(room)
            roomOccupancy[room] = occupants + 1
            socket.emit('roomJoined', { room, occupants: occupants + 1 })
        } else {
            socket.emit('roomFull', { room, occupants })
        }
    })

    socket.on('randRoom', () => {
        const vacantRooms = joinedRooms.filter(
            (room) => roomOccupancy[room] < 2
        )
        const randomIndex = Math.floor(Math.random() * vacantRooms.length)
        const room = vacantRooms[randomIndex]
        const occupants = roomOccupancy[room] || 0
        roomOccupancy[room] += 1
        socket.join(room)
        socket.emit('roomJoined', { room: room, occupants: occupants + 1 })
    })

    socket.on('message', (data) => {
        console.log(data)
        socket.to(data.room).emit('messageReturn', data)
    })

    socket.on('leaveRoom', (room) => {
        roomOccupancy[room] -= 1
        console.log(roomOccupancy[room])
        console.log(joinedRooms)
        if (roomOccupancy[room] === 0) {
            const index = joinedRooms.indexOf(room)
            if (index > -1) {
                joinedRooms.splice(index, 1)
            }
        }
        console.log(joinedRooms)
        // console.log(roomOccupancy[room])
        // console.log(joinedRooms)
    })

    socket.on('disconnect', () => {
        roomOccupancy[joinedRooms] -= 1
        if (roomOccupancy[joinedRooms] === 0) {
            const index = joinedRooms.indexOf(joinedRooms)
            if (index > -1) {
                joinedRooms.splice(index, 1)
            }
        }
        delete onlineUser[socket.userId]
        console.log(onlineUser)
        io.emit('onlinefriends', onlineUser)
        console.log('User Disconnected', socket.id, socket.userId, 'userId')
    })
})

const port = process.env.PORT || 8080
server.listen(port, () => console.log(`server running on port: ${port}`))
