const express = require('express')
const app = express();
const cors  = require('cors')
const mongoose = require('mongoose');
app.use(express.json())
app.use(cors)

mongoose.connect()

app.get('*', (req, res)=>{
   res.status(404).send("webpage doesn't exist");
})

app.listen(8000, ()=>{
    console.log("listening to port 8000..")
})