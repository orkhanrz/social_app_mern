const User = require("../models/user");
const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports = {
  getUser: async (req, res, next) => {
    const username = req.params.username;

    try {
      const user = await User.findOne({ username });

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

    if (!userId || userId === 'undefined') {
      return res.status(404).json({ message: "User not found!" });
    }

    try {
      const posts = await Post.find({ userId });

      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  },
  getFeed: async (req, res, next) => {
    const userId = req.params.userId;
    let feedPosts = [];

    try {
      //Check if user and id exists;
      const user = await User.findById(userId);
      const userPosts = await Post.find({
        userId: userId,
      }).populate("userId", [
        "firstName",
        "lastName",
        "profilePicture",
        "username",
      ]);

      const userFollowingsPosts = await Promise.all(
        user.following.map((userId) => {
          return Post.find({ userId: userId }).populate("userId", [
            "firstName",
            "lastName",
            "profilePicture",
            "username",
          ]);
        })
      );

      feedPosts = userFollowingsPosts.length
        ? userFollowingsPosts[0]
            .concat(userPosts)
            .sort((p1, p2) => p2.date - p1.date)
        : userPosts;

      res.status(200).json(feedPosts);
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
      const me = await User.findById(currentUserId);

      if (followingUser.followers.includes(currentUserId)) {
        await me.updateOne({ $pull: { following: followingUserId } });
        await followingUser.updateOne({ $pull: { followers: currentUserId } });
        return res.status(200).json({ message: "User has been unfollowed!" });
      } else {
        await me.updateOne({ $push: { following: followingUserId } });
        await followingUser.updateOne({ $push: { followers: currentUserId } });
        return res.status(200).json({ message: "User has been followed!" });
      }
    } catch (err) {
      next(err);
    }
  },
};
