const express = require('express')
const app = express();
const cors  = require('cors')
const mongoose = require('mongoose');
app.use(express.json())
app.use(cors)
require('dotenv').config();

mongoose.connect(process.env.MONOGO_URL);

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  db.once('open',()=>{
    console.log("Connected to mongodb")
  })


// ***********************************************LOGIN USER****************************************************
app.use('/', require('./middleware/login/login'));
// ***********************************************REGISTER USER****************************************************
app.use('/', require('./middleware/register/register'));
// ***********************************************LOGIN****************************************************
// app.use('/', require('./middleware/auth/protected'));


app.get('*', (req, res)=>{
   res.status(404).send("webpage doesn't exist");
})

app.listen(800, ()=>{
    console.log("listening to port 800..")
})