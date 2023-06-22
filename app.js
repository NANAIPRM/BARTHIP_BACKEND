require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const messageRoute = require('./routes/messageRoute')
const authRoute = require('./routes/authRoute')
const roomRoute = require('./routes/roomRoute')
const http = require("http");
const { Server } = require('socket.io');


const app = express();

const server = http.createServer(app);

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");



if (process.env.NODE_ENV === "develop") {
  app.use(morgan("combined"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many request" },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute)
app.use('/messages', messageRoute)
app.use('/room', roomRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

const onlineUser = {}

io.use((socket, next) => {
  const userId = socket.handshake.auth.eiei;
  
  if (!userId) {
    return next(new Error("invalid username"));
  }
  socket.userId = userId
  onlineUser[userId] = socket.id
  console.log(onlineUser)
  next();
});


io.on("connection", (socket) => {
  // global.chatSocket = socket;
  
  socket.on("room",id => {
    socket.join(id)
  })

  socket.on("send-msg",(data) => {
    console.log("5555555")
    socket.to(data.room).emit("msg-recieve",data)
  })

});



let port = process.env.PORT || 8000
server.listen(port, () => console.log('Server on port', port))


