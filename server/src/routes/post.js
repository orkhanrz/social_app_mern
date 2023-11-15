const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const upload = require("../utils/multer");

router.get('/:postId/comments', postController.getPostComments);

router.post("/", upload.single("media"), postController.createPost);

router.post('/:postId/like', postController.likePost);

router.post('/:postId/comments', postController.addComment);

router.post('/:postId/comments/:commentId/like', postController.likeComment);

router.put('/:postId/comments/:commentId', postController.editComment);

router.delete('/:postId/comments/:commentId', postController.deleteComment);

module.exports = router;
