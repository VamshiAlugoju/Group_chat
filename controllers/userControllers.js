const bcrypt = require("bcrypt");

const User = require("../models/User")

exports.SignUp = async (req,res)=>{
     
  console.log("hello")
  const {Name,Password,Email,Number}= req.body;

  try{
      bcrypt.hash(Password,10, async(err,hash)=>{
    
        if(err)
          throw new Error("internal error");
        
         await User.create({Name,Password:hash,Email,Number});
        
         res.status(200).json({message:"SignUp successfull"});
    
      })
  }
  catch(err)
  {
     res. status(500).json(err)
  }

}

exports.Login = (req,res)=>{


}