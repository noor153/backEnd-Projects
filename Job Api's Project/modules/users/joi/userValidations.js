const joi = require('joi')

module.exports = {
    registerValidation:{
        body:joi.object().required().keys({
            name:joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
    },
    loginValidation:{
        body:joi.object().required().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
        })
    }

}