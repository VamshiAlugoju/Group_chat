const S = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("User",{
    id:{
        type:S.INTEGER,
        autoIncrement:true,
        NotNUll:true,
        primaryKey:true
    },
    Name:{
        type:S.STRING
    },
    Number:{
        type:S.STRING
    },
    Email:{
        type:S.STRING
    },
    Password:{
        type:S.STRING
    }
});

module.exports = User;