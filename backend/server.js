const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const checkSmsClassifier = require("./middleware/CheckSmsClassifier");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/");
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});
db.once("open", () => {
  console.log("Connected to mongodb");
});
//   app.post('/login',(req,res)=>{
//     res.send("logged in sucessfully")
//   })

// *************************************************LOGIN*************************************************************
app.use("/login", require("./routers/Login/loginR"));
// *************************************************REGISTER*************************************************************
app.use("/signup", require("./routers/Register/registerR"));

app.use("/auth", require("./routers/Auth/protectedR"));
app.get("*", (req, res) => {
  res.send("page doesn't exist");
});
const server = app.listen(3000, () => {
  console.log("listening to port 3000");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173/",
    credentials: true,
  },
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
  socket.on("send-msg", async (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    // const updateUserScoket  = onlineUsers.get(data.from);
    console.log(
      `Sending message to user: ${data.to}, socket ID: ${sendUserSocket}`
    );

    try {
      // Use the middleware to check if the message is spam
      const isSpam = await checkSmsClassifier(data.message);

      if (isSpam) {
        console.log("Blocked spam message:", data.message);
        socket.emit("msg-error", { message: "Spam message detected!" });
        return; // Stop further execution
      }

      // If the message is not spam, send it to the intended recipient
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msgrecieve", data.message);
        console.log("Message sent successfully to receiver");
      } else {
        console.log(`User with ID: ${data.to} is not online.`);
        socket.emit("msg-error", { message: "Recipient is offline." });
      }
    } catch (error) {
      console.error("Error while processing message:", error);
      socket.emit("msg-error", { message: "Internal server error." });
    }
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
    console.log(
      "Current online users after disconnect:",
      Array.from(onlineUsers.entries())
    );
  });
});
