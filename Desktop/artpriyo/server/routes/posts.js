const express = require("express");
const { createPost, fetchAllPosts, deletePost } = require("../Controllers/Posts");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/createPost",isAuth,createPost);
router.get("/fetchAllPosts",isAuth,fetchAllPosts);
router.delete("/delete/post",isAuth,deletePost);
module.exports = router;