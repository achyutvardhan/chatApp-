const express = require("express");
const router = express.Router();
const {register} = require("../../controller/Registercont");
router.post("/register", register);

module.exports = router;
