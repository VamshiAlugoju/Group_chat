
const Group = require("../models/Groups");
const link = require("../models/GtoUlink");
const User = require("../models/User");
const Sequelize = require("sequelize");
const userGroups = require("../models/userGroups");
const sequelize = require("../util/database");


exports.getGroupdetails =async (req,res)=>{
  try{ 
    let id = req.params.id;
   
    let groups =  await Group.findOne({where:{id:id}});

    let data = await sequelize.query(`SELECT Name,isadmin,UserId FROM userGroups JOIN Users ON userGroups.UserId = Users.id WHERE userGroups.GroupId = ${id}`)
    
    let modified_users = {users_arr:data,admin:groups.Admin};
        res.status(200).json(modified_users);
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

exports.delete_user = async (req,res)=>{
    
  let group_id = req.query.group_id;
  let user_id = req.query.user_id;
 
  try{
       
    let group = await Group.findOne({where:{id:group_id}});
    let user = await User.findOne({where:{id:user_id}});
    if(user && group)
    {
      await group.removeUser(user);
      res.status(200).json({success:true});
    }
    else{
      throw new Error({ message:"user or group not found",success:false})
    }

  }
  catch(err)
  {
     res.status(500).json(err);
  }
}

exports.makeAdmin = async(req,res)=>{
  try{
     const {UserId,GroupId} = req.body
     if(UserId === "" || GroupId ==="")
     {
      throw new Error("invalid details");
     }
    
      await userGroups.update({isadmin:true},{where:{GroupId,UserId}});
      res.status(200).json({success:true})

  }
  catch(err)
  {
    res.status(500).json(err);
  }
}