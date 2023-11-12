const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  getUser: async (req, res, next) => {
    const username = req.params.username;

    try {
      const user = await User.findOne({ username }).populate("posts");

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const { password, ...userDetails } = user._doc;

      return res.status(200).json(userDetails);
    } catch (err) {
      next(err);
    }
  },
  getUserPosts: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const posts = await Post.find({ userId });

      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
  followUser: async (req, res, next) => {
    const currentUserId = req.body.userId;
    const followingUserId = req.params.userId;

    if (currentUserId === followingUserId) {
      return res.status(403).json({ message: "You cannot follow yourself!" });
    }

    try {
      const followingUser = await User.findById(followingUserId);

      if (followingUser.followers.includes(currentUserId)) {
        await followingUser.updateOne({ $pull: { followers: currentUserId } });
        return res.status(200).json({ message: "User has been unfollowed!" });
      } else {
        await followingUser.updateOne({ $push: { followers: currentUserId } });
        return res.status(200).json({ message: "User has been followed!" });
      }
    } catch (err) {
      next(err);
    }
  },
};
