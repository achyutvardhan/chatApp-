const jwt = require('jsonwebtoken');
const { User , Message } = require('../database/db');

const sendMessage = async(req,res)=>{
     const token = req.headers.authorization;
     if (!token) return res.status(404).json({ message: "Invalid Token" });
     try {
        const sender_id = req.params.id;
        const receiver_id = req.body.receiver;
        const data = req.body.data;
        const decode =  jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        if (decode.userId != sender_id)
            return res.status(404).json({ message: "Invalid senders id" });
          const user = await User.findById(decode.userId );
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }

          const updateMessage = await Message.create({
             sender_id : sender_id,
             receiver_id: receiver_id,
             data: data,
          })
          await updateMessage.save();
          res.status(201).json({ message: `${sender_id} message was sent` });

     } catch (error) {
        console.error("Error accessing protected route:", error);
        res.status(500).json({ message: "Internal server error" });
     }
}

exports.sendMessage = sendMessage