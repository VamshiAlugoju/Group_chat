const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const userRoutes= require("./Routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes);
app.get("/",(req,res)=>{
    
    res.json("hello")
})

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log("listening");
    })
})
.catch(err=>console.log(err))
