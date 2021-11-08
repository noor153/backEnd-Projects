const mongoose = require('mongoose');
const { advSchema } = require('../Adv/schema/advSchema');
const postsSchema = require('../posts/schema/postsSchema');
const { reportSchema } = require('../Reports/schema/reportSchema');
const userSchema = require('../users/schema/userSchema');

const User = mongoose.model("user",userSchema)
const Posts = mongoose.model("posts",postsSchema)
const Adv = mongoose.model("adv",advSchema)
const Report = mongoose.model("report",reportSchema)
module.exports={
    User,
    Posts,
    Adv,
    Report
}