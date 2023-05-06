const S = require("sequelize");
const sequelize = require("../util/database");

const Chats = sequelize.define("Chats",{
    id:{
        type:S.INTEGER,
        autoIncrement:true,
        NotNUll:true,
        primaryKey:true
    },
    userId:{
        type:S.INTEGER
    },
    message:{
        type:S.STRING
    }
});

module.exports = Chats;