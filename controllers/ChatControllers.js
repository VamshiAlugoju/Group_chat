const { Model } = require("sequelize");
const Chats = require("../models/Chats");
const Groups = require("../models/Groups");
const User = require("../models/User");
const sequelize = require("../util/database")
const upload_to_s3 = require("../service/aws")



let message_to_send;

exports.PostMessage = async (req,res)=>{

  
    try{
        const Id = req.user.id;
        const message= req.body.Msg;
        const id = req.params.id

        const name = await User.findOne({where:{id:Id}});
        let msg;
        if(req.file)
        {
            const link = await  upload_to_s3( req.file.originalname, req.file.buffer)
            
            msg = await Chats.create({UserId:Id , type:"file",GroupId:id,image:link})
             
        }
        else{
            if(!Id || !message)
            {
                throw new Error("something went wrong");
            }
    
            msg =  await Chats.create({UserId:Id,message,GroupId:id,type:"text"});
        }
       const modifiedmsg = {...msg.dataValues,User:{Name:name.Name}}
       message_to_send = modifiedmsg;
        res.status(201).json(modifiedmsg);
    }
    catch(err)
    {
      res.status(500).json(err);
    }
}

exports.chatsocket = (io)=>{
     
    io.on("connection",(socket)=>{
        console.log( `${socket.id} connected `)
        socket.on("setup",(user)=>{
            socket.join(user.id .toString())
            socket.emit("connected")
        })

        socket.on("sent",async (message,Gid)=>{
           io.in(Gid.toString()).emit("recieve",message)
        })

        socket.on("join",(id)=>{
            if(!id)
              return;
            console.log( `${socket.id} joining the room ${id} `)
            socket.join(id.toString());
        })
    })
}



exports.getMessages = async (req,res)=>{
    
    try{
        const id = req.params.id;
        const user = req.user;

         
         
        const messages = await Chats.findAll({where:{GroupId:id} , 
           include:[
           {model:User,attributes:["Name"]},
           ]
        })
 
         
        // const messages  =  await Chats.findAll({where:{GroupId:id}});
        // const modifiedMessages= messages.map(item=>{
        //       return{...item.dataValues,type:user.id === item.userId ? "me":"other"}
        // }) 
        res.status(200).json(messages);
    }
    catch(err)
    {  
        console.log(err)
        res.status(500).json(err)
    }

}