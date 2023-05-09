const Chats = require("../models/Chats");

exports.PostMessage = async (req,res)=>{
  
    try{
        const Id = req.user.id;
        const message= req.body.Msg;
        const id = req.params.id
        
        if(!Id || !message)
        {
            throw new Error("something went wrong");
        }
        
       let msg =  await Chats.create({userId:Id,message,groupId:id});
       const modifiedmsg = {...msg,type:"me"}

       console.log(modifiedmsg)
        res.status(201).json(modifiedmsg);
    }
    catch(err)
    {
      res.status(500).json(err);
    }
}



exports.getMessages = async (req,res)=>{
    
    try{
        const id = req.params.id;
        const user = req.user;
         
        const messages  =  await Chats.findAll({where:{groupId:id}});
        const modifiedMessages= messages.map(item=>{
              return{...item.dataValues,type:user.id === item.userId ? "me":"other"}
        }) 
        res.status(200).json(modifiedMessages);
    }
    catch(err)
    {
        res.status(500).json(err)
    }

}