const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const upload = require("../utils/multer");

router.post("/", upload.single("media"), postController.createPost);

router.post('/:postId/like', postController.likePost);

router.post('/:postId/comment', postController.commentPost);

module.exports = router;
