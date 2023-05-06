const jwt = require("jsonwebtoken");

const User = require("../models/User");

const Authenticate = (req,res,next)=>{
   
    try{
        let token  = req.header("Authorization");
        let user =  jwt.verify(token,process.env.TOKEN)
        User.findOne({where:{id:user.id}})
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>{
           throw new Error(err);
        })
    }
    catch(err){
        res.status(500).json(err);
    }
}