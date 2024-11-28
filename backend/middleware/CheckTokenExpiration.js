const jwt = require("jsonwebtoken");
const { User } = require("../database/db");
require("dotenv").config();
const checkTokenExpiration = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: "Invalid Token" });
  try {
    const decode = jwt.verify(token, "secretkey");
    if (Date.now() >= decode.exp * 1000) {
      User.findByIdAndDelete(decode.userId, { token: null }, (err) => {
        if (err) {
          console.error("Error updating token:", err);
        }
      });
      return res.status(401).json({ message: "Token Expired" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error: error });
  }
};

exports.checkTokenExpiration = checkTokenExpiration;