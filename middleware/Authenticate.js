const jwt = require("jsonwebtoken");

const User = require("../models/User");

const Authenticate = (req,res,next)=>{
    
    
    try{
        let token  = req.header("Autorization");
        let userId =  jwt.verify(token,process.env.TOKEN)
        if(!userId)
          throw new Error("something went wrong");

        User.findOne({where:{id:userId}})
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>{
           throw new Error(err);
        })
    }
    catch(err){
        console.log( "thsi is >>>>>>>>>>>" , err);
        res.status(500).json(err);
    }
}

 module.exports = {Authenticate}