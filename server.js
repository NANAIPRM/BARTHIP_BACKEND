// const server = require('./app');
// const { Server } = require("socket.io");
// require("dotenv").config();

// const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//       methods: ["GET", "POST"],
//     },
// });
  

// const onlineUsers = {}

// io.use((socket,next) => {
//     const userId = socket.handshake.auth.id;
//     onlineUsers[userId] = socket.id
//     next()
// })

// io.on("connection", (socket) => {
//     global.chatSocket = socket;
//     console.log(onlineUsers)
//     socket.on("add-user", (userId) => {
//         onlineUsers.set(userId, socket.id);
//     });
    
//     socket.on("send-msg", (data) => {
//         const sendUserSocket = onlineUsers.get(data.to);
//         if (sendUserSocket) {
//             socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//         }
//     });
// });


// server.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );