const {UserDetails , User} = require('../database/db')
const bcrypt = require('bcrypt')
const {v4 : uuidv4 } = require('uuid')
const {z} = require('zod');

const RegisterSchema = z.object({
    username : z.string(),
    phoneno : z.number().min(10),
    password : z.string().min(8),
    email : z.string().email(),
    // gender : z.enum(["Male","Female","Other"])
})

const register = async(req,res)=>{

    try{

        const {username , phoneno , password , email , gender}  = req.body;
        const result = RegisterSchema.safeParse({
            username : username,
            phoneno : phoneno,
            password : password,
            email : email ,
            //  gender : gender
        })
        if(!result.success)
        return res.status(400).json({message : result.error.issues.map((err)=>err.message)});
        
        const foundUser = await User.findOne({email});
        if(foundUser)
        return res.status(409).json({message : "Username already exists"});
    
        const userid = uuidv4();
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password,salt);
    
        const user = new User({
            id_no : userid,
            password : hashPassword,
            email : email,
        })
    
        const userdetail = new UserDetails({
            user_id : user._id,
            user_name : username,
            // gender : gender,
            phone_no : phoneno,
        })
    
        await user.save();
        await userdetail.save()
        res.status(201).json({ message: 'User created successfully' });
    }
    catch(error){
        console.log('Error Login' , error);
         res.status(500).json({message : 'Internal server error'})
    }
}

exports.register = register;