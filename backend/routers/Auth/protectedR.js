const express = require('express');
const router = express.Router()
const {checkTokenExpiration} = require('../../middleware/CheckTokenExpiration');
const {sendMessage} = require("../../controller/SendMessage")
const {readMessage} = require("../../controller/readMessage")

router.post('/send/:id',checkTokenExpiration, sendMessage);
router.post('/read/:id',checkTokenExpiration ,readMessage);