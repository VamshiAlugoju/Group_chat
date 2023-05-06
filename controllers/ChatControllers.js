const Chats = require("../models/Chats");

exports.PostMessage = async (req,res)=>{
     
    try{
        const Id = req.user.id;
        const {message}= req.body.Message;
        await Chats.create({userId:Id,message});
        res.status(201).json("sent");
    }
    catch(err)
    {
      res.status(500).json(err);
    }
}