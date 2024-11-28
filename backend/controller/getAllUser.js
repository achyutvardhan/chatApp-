const { UserDetails , User} = require("../database/db");
const jwt = require("jsonwebtoken");
const getAllUser = async(req,res)=>{

    const token = req.headers.authorization;
    const userId = req.params.id;
    if (!token) return res.status(404).json({ message: "Invalid Token" });
    try {

        const decode = jwt.verify(token, "secretkey");
        // console.log(decode)
        const user = await UserDetails.find({user_id: decode.userId});
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const users = await UserDetails.find(
            { user_id: { $ne: userId } }, 
            { user_name: 1, user_id: 1 } 
          );
        const email_id = await User.find(
            { user_id: { $ne: userId } }, 
            { email:1 , _id: 1 } 
          );
          const usersWithEmail = users.map(user => {
            const emailObj = email_id.find(email =>{ 
                return email._id.equals(user.user_id)
            });
            // console.log(emailObj)
            return {
              ...user._doc, // Use _doc to access the document data
              email: emailObj ? emailObj.email : null // Add email if found
            };
          });
       res.status(200).json({ message: usersWithEmail });
        
    } catch (error) {
        console.error("Error accessing protected route:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

exports.getAllUser = getAllUser;
