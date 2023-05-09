const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes= require("./Routes/userRoutes");
const ChatRoutes = require("./Routes/Chats");
const groupRoutes = require("./Routes/GroupRoutes");
 
const app = express();
const User = require("./models/User");
const Groups = require("./models/Groups");

app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);
app.use("/chats",ChatRoutes);
app.use("/groups",groupRoutes);

app.get("/",(req,res)=>{
    
    res.json("hello")
})

Groups.belongsToMany(User,{through:"userGroups"});
User.belongsToMany(Groups,{through:"userGroups"});

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log("listening");
    })
})
.catch(err=>console.log(err))
