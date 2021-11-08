const joi = require("joi");

module.exports = {
  addAdvSchema: {
    body: joi.object().required().keys({
      title: joi.string().required(),
      description: joi.string().required(),
    }),
  },
  editAdvSchema: {
        body: joi.object().required().keys({
          title: joi.string().required(),
          description: joi.string().required(),
        }),
        params:joi.object().required().keys({
          id: joi.string().required(),
        }),}
        
  ,  deleteAdvSchema: {
        params:joi.object().required().keys({
            id: joi.string().required(),
        }),}
};
