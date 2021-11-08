const joi = require("joi");

module.exports = {
  addUserSchema: {
    body: joi
      .object()
      .required()
      .keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        cPassword: joi.ref("password"),
        phone: joi.number().required(),
        location: joi.string().required(),
      }),
  },

  signInSchema: {
    body: joi.object().required().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
  },
  addAdminSchema: {
    body: joi
      .object()
      .required()
      .keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        cPassword: joi.ref("password"),
        phone: joi.number().required(),
        location: joi.string().required(),
      }),
  },
  idSchema: {
    params:joi.object().required().keys({
      id: joi.string().required(),
  }),  },
  updatePasswordSchema: {
    body: joi
      .object()
      .required()
      .keys({
        oldPassword: joi.string().required(),
        newPassword: joi.string().required(),
        cnewPassword: joi.ref("newPassword"),
      }),
  },
  updateUserSchema: {
    body: joi
      .object()
      .required()
      .keys(
        { name: joi.string().required() }
      ),
      params:joi.object().required().keys({
        id: joi.string().required(),
    })
  },
};
