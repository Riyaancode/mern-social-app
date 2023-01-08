const express = require('express');
const router = express.Router();
const posts = require('../controller/post')

router.post("/", posts.creatPost)
router.get("/", posts.getFeedPost);
router.get("/:userId/posts", posts.getUserPosts);
router.patch("/:id/like", posts.likePost);


module.exports = router;