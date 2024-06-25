const jwt = require("jsonwebtoken");
const { User } = require("../database/db");
const multer = require("multer");
const bcrypt = require("bcrypt");

const editProfile = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: "Invalid Token" });
  try {
    const user_id = req.params.id;
    const data = req.body.data;
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decode.userId != user_id)
      return res.status(404).json({ message: "Invalid senders id" });
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let hashNewPass;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    if (data.password) hashNewPass = await bcrypt.hash(password, salt);

    user.email = data.email ? data.email : user.email;
    user.password = hashNewPass ? hashNewPass : user.password;
    await user.save();
    res.status(200).json({ message: "Profile Updated Succesfully" });
  } catch (error) {
    console.error("Error accessing protected route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editProfile = editProfile;
