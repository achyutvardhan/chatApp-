const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json())
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
app.use('/', require('./routers/Login/loginR'))
// *************************************************REGISTER*************************************************************
app.use('/',require('./routers/Register/registerR'))

  app.get('*',(req,res)=>{
    res.send("page doesn't exist");
  })
  app.listen(3000,()=>{
    console.log("listening to port 3000")
  })