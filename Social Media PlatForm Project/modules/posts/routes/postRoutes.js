const { getAllPosts, addPost, viewPosts, editPost, getMyPosts, deletePost, block } = require("../controller/postsController");
const  validateRequest= require('../../../common/middleWare/validateRequest');
const { addPostSchema, editPostSchema, deletePostSchema } = require("../joi/postsValidation");
const postServer = require("express").Router();
const isAuthorized = require("../../../common/middleWare/isAuthorized");
const { GET_ALL_POSTS, USER_POSTS, BLOCK_POST } = require("../../users/endPoints");

postServer.get("/getAllPosts",getAllPosts)
postServer.get("/getMyPosts",isAuthorized(USER_POSTS),getMyPosts)
postServer.get("/viewPosts",isAuthorized(GET_ALL_POSTS),viewPosts)
postServer.post("/addPost",isAuthorized(USER_POSTS),validateRequest(addPostSchema),addPost)
postServer.post("/editPost",isAuthorized(USER_POSTS),validateRequest(editPostSchema),editPost)
postServer.delete("/deletePost/:id",isAuthorized(USER_POSTS),validateRequest(deletePostSchema),deletePost)
postServer.post("/blockPost/:id",isAuthorized(BLOCK_POST),block)


module.exports = postServer;