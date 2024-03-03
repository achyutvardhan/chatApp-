const express = require("express");
const router = express.Router();
const {login}= require("../../controller/Logincont");
router.get("/login", login);

module.exports = router;
