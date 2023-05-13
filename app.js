const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");

const sequelize = require("./util/database");
const userRoutes= require("./Routes/userRoutes");
const ChatRoutes = require("./Routes/Chats");
const groupRoutes = require("./Routes/GroupRoutes");
const ChatControllers = require("./controllers/ChatControllers")
const chatsocket = ChatControllers.chatsocket;
require("dotenv").config();

const app = express();
const server = http.createServer(app)
const io = socketIo(server,{
    cors:{
        origin:"*"
    }
});

app.use(cors());
const User = require("./models/User");
const Groups = require("./models/Groups");
const Chat = require("./models/Chats");
const Chats = require("./models/Chats");

app.use(bodyParser.json());

app.use("/user",userRoutes);
app.use("/chats",ChatRoutes);
app.use("/groups",groupRoutes);

app.get("/",(req,res)=>{
    
    res.json("hello")
})

 

 chatsocket(io);


Groups.belongsToMany(User,{through:"userGroups"});
User.belongsToMany(Groups,{through:"userGroups"});
Chats.belongsTo(Groups);
Chats.belongsTo(User);

sequelize.sync()
.then(()=>{
     server.listen(3000)
})
.catch(err=>console.log(err))
