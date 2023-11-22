const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.get("/:username", userController.getUser);

router.get("/:userId/photos", authMiddleware, userController.getPhotos);

router.get("/:userId/videos", authMiddleware, userController.getVideos);

router.get("/:userId/albums", authMiddleware, userController.getAlbums);

router.get("/:userId/posts", authMiddleware, userController.getUserPosts);

//Update [friends and followings] posts
router.get("/:userId/feed", authMiddleware, userController.getFeed);

router.get(
  "/:userId/notifications",
  authMiddleware,
  userController.getNotifications
);

router.post("/search", authMiddleware, userController.search);

router.post("/:userId/follow", authMiddleware, userController.followUser);

router.post(
  "/:userId/remove_friend",
  authMiddleware,
  userController.removeFriend
);

router.post(
  "/:userId/respond_request",
  authMiddleware,
  userController.respondRequest
);

router.put(
  "/:userId/edit",
  authMiddleware,
  upload.fields([{ name: "profilePicture" }, { name: "coverPicture" }]),
  userController.editUser
);

module.exports = router;
