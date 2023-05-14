const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const linker = require("../models/GtoUlink");
const Groups = require("../models/Groups");
const sequelize = require("../util/database");
const upload_to_s3 = require("../service/aws");
const userGroups = require("../models/userGroups");

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
            {
              throw new Error("internal error");
            }
              console.log(result)
            if(result)
              res.status(201).json({success:true,user:{id:user.id,Name:user.Name},token:generatetoken(user.id)});
            else
              res.status(201).json({success:false})
        })
     }
     catch(err)
     {
       res.status(400).json(err);
     }
}

exports.getGroups = async(req,res)=>{
     
  try{
      let user = req.user;
      let groups = await user.getGroups();
      res.status(201).json(groups);
     
  }catch(err)
  {
      res.status(500).json(err);
  }

}

exports.createGroup = async(req,res)=>{

  const file = req.file;
  const t =await sequelize.transaction();
   try{
         const user = req.user;
         const {Name} = req.body;

         if(Name === "")
         {
          throw new Error("please enter the name");
         }
         console.log(user, typeof(user))
         const link = await upload_to_s3(file.originalname,file.buffer);

         const group = await Groups.create({Name,Admin:user.id,image:link});
        //  await linker.create({userId:user.id,groupId:group.id,groupname:Name},{transaction:t});
         await user.addGroups(group);
         await userGroups.update({isadmin:true},{where:{GroupId:group.id , UserId:user.id}});
        //  await t.commit();
         res.status(200).json(group);
   }
   catch(err)
   {
    //  await t.rollback();
     res.status(500).json(err)
   }

}