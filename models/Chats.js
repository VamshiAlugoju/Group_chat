const { INTEGER } = require("sequelize");
const S = require("sequelize");
const sequelize = require("../util/database");

const Chats = sequelize.define("Chats",{
    id:{
        type:S.INTEGER,
        autoIncrement:true,
        NotNUll:true,
        primaryKey:true
    },
    type:{
        type:S.STRING
    },
    image:{
        type:S.STRING
    },
    message:{
        type:S.STRING
    },
    
});

module.exports = Chats;