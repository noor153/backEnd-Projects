const joi = require("joi")


module.exports = {
    signUpSchema:{
        body:joi.object().required().keys({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            cPassword: joi.ref("password"),
        })
    },

    signInSchema:{
        body:joi.object().required().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        })
    }
}