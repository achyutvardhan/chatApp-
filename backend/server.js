const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
app.use(cors());
app.use(express.json())
app.use(cookieParser())
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  db.once('open',()=>{
    console.log("Connected to mongodb")
  })
//   app.post('/login',(req,res)=>{
//     res.send("logged in sucessfully")
//   })

// *************************************************LOGIN*************************************************************
app.use('/login', require('./routers/Login/loginR'))
// *************************************************REGISTER*************************************************************
app.use('/signup',require('./routers/Register/registerR'))

app.use('/auth', require('./routers/Auth/protectedR'))
app.get('*',(req,res)=>{
    res.send("page doesn't exist");
  })
const server = app.listen(3000,()=>{
    console.log("listening to port 3000")
  })


 const io = socket(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
      credentials: true
    }
  });

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(socket.id);
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });