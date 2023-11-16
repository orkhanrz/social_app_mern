const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const upload = require("../utils/multer");

router.post('/search', userController.search);

router.get("/:username", userController.getUser);

router.get("/:userId/photos", userController.getPhotos);

router.get("/:userId/albums", userController.getAlbums);

router.get("/:userId/posts", userController.getUserPosts);

router.get("/:userId/feed", userController.getFeed);

router.post("/:userId/follow", userController.followUser);

router.put(
  "/:userId/edit",
  upload.fields([{ name: "profilePicture" }, { name: "coverPicture" }]),
  userController.editUser
);

module.exports = router;
