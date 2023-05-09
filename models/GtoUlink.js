const S = require("sequelize");
const sequelize = require("../util/database");

const GtoUlink = sequelize.define("GtoUlink",{
    id:{
        type:S.INTEGER,
        autoIncrement:true,
        NotNUll:true,
        primaryKey:true
    },
    userId:{
        type:S.INTEGER
    },
    groupId:{
        type:S.INTEGER
    },
    groupname:{
        type:S.STRING
    }
});

module.exports = GtoUlink;