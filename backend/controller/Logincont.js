const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../database/db')
const {z} = require('zod');
require('dotenv').config();

const LoginSchema = z.object({
    email : z.string().email(),
    password : z.string()
})
const login = async(req,res)=>{
    try{

        const {email , password} = req.body;
        const result = LoginSchema.safeParse({
            email : email,
            password : password
        })
        if(!result.success)
        {
            return res.status(400).json(result)
        }
        const foundUser = await User.findOne({email});
        if(!foundUser)
        {
            return res.status(404).json({message : 'User not found'});
        }

        const confPass = await bcrypt.compare(password , foundUser.password);
        if(!confPass)
        return  res.status(404).json({message : 'Invalid Password'});
        console.log(result)

        const token  =  generateToken(foundUser);
        foundUser.token = token;
        await foundUser.save();
        res.status(200).json({token});
    }
    catch(error){
         console.log('Error Login' , error);
         res.status(500).json({message : 'Internal server error'})
    }
}

const generateToken = (user)=>{
    const token = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET_KEY ,{expiresIn : '1h'});
    return token;
}

exports.login = login;