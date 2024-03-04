const express = require('express')
const router = express.Router();
const {login} = require('../../controller/Logincont');
const { Module } = require('module');
router.post('/login',login);

module.exports = router;