const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
app.use(cors({
  origin:'https://chat-app-two-tau.vercel.app/' ,
  credentials: true, 
}));
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
      origin: "https://chat-app-two-tau.vercel.app/",
      credentials: true
    }
  });

  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    global.chatSocket = socket;
  
    // Listen for 'add-user' event and map userId to socket.id
    socket.on("add-user", (userId) => {
      console.log(`Adding user: ${userId} with socket ID: ${socket.id}`);
      onlineUsers.set(userId, socket.id);
      console.log("Current online users:", Array.from(onlineUsers.entries()));
    });
  
    // Listen for 'send-msg' event and forward message to the intended recipient
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      // const updateUserScoket  = onlineUsers.get(data.from);
      console.log(`Sending message to user: ${data.to}, socket ID: ${sendUserSocket}`);

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msgrecieve", data.message);
        console.log("Message sent successfully to receiver");
      } else {
        console.log(`User with ID: ${data.to} is not online.`);
      }
      // console.log(`Sending message to user: ${data.from}, socket ID: ${updateUserScoket}`);
      // if(updateUserScoket){
      //   socket.to(updateUserScoket).emit("msgrecieve", data.message);
      //   console.log("Message sent successfully to sender");
      // } else {
      //   console.log(`User with ID: ${data.from} is not online.`);
      // }
    });
  
    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove the user from the onlineUsers map if needed
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`Removed user: ${userId} from online users`);
          break;
        }
      }
      console.log("Current online users after disconnect:", Array.from(onlineUsers.entries()));
    });
  });
  