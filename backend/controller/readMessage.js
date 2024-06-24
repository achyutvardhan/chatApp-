const jwt = require("jsonwebtoken");
const { User ,Message} = require("../database/db");
const readMessage = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: "Invalid Token" });
  try {
    const userId = req.params.id;
    const receiverId = req.body;
    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decode.userId != userId)
      return res.status(404).json({ message: "User not found" });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: receiverId },
        { sender_id: receiverId, receiver_id: userId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json({ message: messages });
  } catch (error) {
    console.error("Error accessing protected route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.readMessage = readMessage