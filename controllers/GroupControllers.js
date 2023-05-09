
const Group = require("../models/Groups");
const link = require("../models/GtoUlink");
const User = require("../models/User");
const Sequelize = require("sequelize");
 
exports.getGroupdetails =async (req,res)=>{
  try{ 
    let id = req.params.id;
    let groups =  await Group.findOne({where:{id:id}});
    let users = await groups.getUsers();
        res.status(200).json(users);
  }
  catch(err)
  {
      res.status(500).json(err);
  }
}

exports.get_group_users =async (req,res)=>{
   
 
  try{
     
    const users = await User.findAll();
    res.status(200).json(users);
  }
  catch(err)
  {  
    // console.log("heelllo")
    console.log("err is" ,err);
    res.status(500).json(err);
  }
}

exports.add_to_group = async (req,res)=>{
   
  try{
       const userId = req.body.userId;
       const groupId = req.body.groupId;
       console.log(userId,groupId)
       const user = await User.findOne({where:{id:userId}});
       const group = await Group.findOne({where:{id:groupId}});
       await user.addGroup(group);
       res.status(201).json("added to group");
  }
  catch(err)
  {
     res.status(500).json(err);
  }

}