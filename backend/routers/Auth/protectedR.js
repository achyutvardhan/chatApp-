const express = require('express');
const router = express.Router()
const {checkTokenExpiration} = require('../../middleware/CheckTokenExpiration');
const {sendMessage} = require("../../controller/SendMessage")
const {readMessage} = require("../../controller/readMessage")
const {editProfile} = require("../../controller/editProfile")
const {getAllUser} = require("../../controller/getAllUser");
const { checkSmsClassifier } = require('../../middleware/CheckSmsClassifier');
router.post('/sendChat/:id',checkTokenExpiration, sendMessage);
router.post('/getChat/:id',checkTokenExpiration ,readMessage);
router.post('/updateProfile/:id',checkTokenExpiration ,editProfile);
router.get('/getallUser/:id',checkTokenExpiration, getAllUser);

module.exports = router;