const roles = require("../../common/enum/roles")
const adminPolicy = require("./adminPolicy")
const userPolicy = require("./userPolicy")
const superAdminPolicy = require("./superAdminPolicy")

const opts = {
    [roles.ADMIN]:{
        can :adminPolicy
    }
    ,
    [roles.SUPER_ADMIN]:{
        can :superAdminPolicy
    }
    ,
    [roles.USER]:{
        can :userPolicy
    }
}

module.exports = opts