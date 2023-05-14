const S = require("sequelize");
const sequelize = require("../util/database");

const Groups = sequelize.define("Groups",{
    id:{
        type:S.INTEGER,
        autoIncrement:true,
        NotNUll:true,
        primaryKey:true
    },
    Name:{
        type:S.STRING
    },
    Admin:{
        type:S.INTEGER
    },
    image:{
        type:S.STRING
    }
   });

module.exports = Groups;