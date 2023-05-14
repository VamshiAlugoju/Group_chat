const S = require("sequelize");
const sequelize = require("../util/database");

const userGroups = sequelize.define("userGroups",{
    
    GroupId:{
        type:S.INTEGER
    },
    UserId:{
        type:S.INTEGER
    },
    isadmin:{
        type:S.BOOLEAN
    }
})

module.exports = userGroups