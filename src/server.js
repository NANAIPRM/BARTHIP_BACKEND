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
    socket.on('room', (data) => {
        const room = data
        const occupants = roomOccupancy[room] || 0

        if (occupants < 2) {
            socket.join(room)
            roomOccupancy[room] = occupants + 1
            console.log(roomOccupancy[room])

            socket.emit('roomJoined', { room, occupants: occupants + 1 })
            if (!joinedRooms.includes(room)) {
                joinedRooms.push(room)
            }
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

        if (vacantRooms.length > 0) {
            const room = vacantRooms[0] // เลือกห้องแรกจาก vacantRooms
            const occupants = roomOccupancy[room] || 0

            socket.join(room)
            roomOccupancy[room] = occupants + 1

            socket.emit('roomJoined', { room, occupants: occupants + 1 })
        } else {
            socket.emit('roomFull', { room, occupants })
        }
    })

    socket.on('message', (data) => {
        console.log(data)
        socket.to(data.room).emit('messageReturn', data)
    })

    socket.on('leaveRoom', (room) => {
        roomOccupancy[room] -= 1 // ลดจำนวนผู้ใช้ในห้องลงทีละ 1
        console.log(roomOccupancy[room]) // แสดงจำนวนผู้ใช้ในห้องหลังจากลด
    })

    socket.on('disconnect', () => {})
})

const port = process.env.PORT || 8080
server.listen(port, () => console.log(`server running on port: ${port}`))
