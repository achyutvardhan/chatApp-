const express = require('express')
const router = express.Router();
const {login} = require('../../controller/Logincont');

router.post('/',login);

module.exports = router;