const joi = require("joi");

module.exports = {
  addRepSchema: {
    body: joi.object().required().keys({
        postID: joi.string().required(),
        reportComment: joi.string().required(),
    }),
  }
};
