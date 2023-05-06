const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User")

function generatetoken(userId)
{
  return  jwt.sign(userId,process.env.TOKEN)
}

exports.SignUp = async (req,res)=>{
     
  console.log("hello")
  const {Name,Password,Email,Number}= req.body;

  try{
     let user = await User.findOne({where:{Email}})
     if(user)
       res.json({message:"user already exist please Login"})
     else{
         bcrypt.hash(Password,10, async(err,hash)=>{
       
           if(err)
             throw new Error("internal error");
           
            await User.create({Name,Password:hash,Email,Number});
           
            res.status(200).json({message:"SignUp successfull"});
         })
     }
  }
  catch(err)
  {
     res. status(500).json(err)
  }

}

exports.Login = async (req,res)=>{

     try{
        const {Email,Password} = req.body;
        let user =  await User.findOne({where:{Email}});
        if(!user){
          return  res.status(204).json("cannot find user with Email id");
        }
        bcrypt.compare(Password,user.Password,(err,result)=>{
            if(err)
              throw new Error("internal error");
              console.log(result)
            if(result)
              res.status(201).json({success:true,token:generatetoken(user.id)});
            else
              res.status(201).json({success:false})
        })
     }
     catch(err)
     {
       res.status(400).json(err);
     }

}