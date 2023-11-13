const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const upload = require("../utils/multer");

router.post("/", upload.single("media"), postController.createPost);

router.put('/:postId/like', postController.likePost);

module.exports = router;
