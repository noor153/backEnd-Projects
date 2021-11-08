const joi = require("joi");

module.exports = {
  addPostSchema: {
    body: joi.object().required().keys({
      title: joi.string().required(),
      description: joi.string().required(),
    }),
  },
  editPostSchema: {
        body: joi.object().required().keys({
          title: joi.string().required(),
          description: joi.string().required(),
          postId: joi.string().required(),
        }),}
  ,  deletePostSchema: {
    params: joi.object().required().keys({

      id: joi.string().required(),
    }),}
};
