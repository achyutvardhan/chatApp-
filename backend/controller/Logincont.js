const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../database/db");
const { z } = require("zod");
require("dotenv").config();

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string({ messsage: "Invalid password " }),
});

const login = async (req, res) => {
  const result = loginSchema.safeParse({email : req.body.email , password : req.body.password});
  if(! result.success)
  {
    return res.status(400).json({message : result.success});
  }

  try{
    const {email , passsword }  = req.body;
    

  }
  catch(error){
     console.log('error Login', error);
     res.status(500).json({message : 'Internal Server Error'});
  }
};

exports.login = login;
