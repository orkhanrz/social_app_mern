const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const upload = require("../utils/multer");

router.post("/", upload.single("media"), postController.createPost);

module.exports = router;
