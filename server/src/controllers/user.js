const User = require("../models/user");
const Post = require("../models/post");
const Album = require("../models/album");
const Photo = require("../models/photo");
const Video = require("../models/video");
const Notification = require("../models/notification");

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

    if (!userId || userId === "undefined") {
      return res.status(404).json({ message: "User not found!" });
    }

    try {
      const posts = await Post.find({ userId }).sort({ date: -1 });

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
      })
        .sort({ date: -1 })
        .populate("userId", [
          "firstName",
          "lastName",
          "profilePicture",
          "username",
        ]);

      // Get all posts of followed users
      const userFollowingsPosts = await Promise.all(
        user.following?.map((userId) => {
          return Post.find({ userId: userId }).populate("userId", [
            "firstName",
            "lastName",
            "profilePicture",
            "username",
          ]);
        })
      );

      // Get all posts of friends users
      const friendsPosts = await Promise.all(
        user.friends?.map((userId) => {
          return Post.find({ userId: userId }).populate("userId", [
            "firstName",
            "lastName",
            "profilePicture",
            "username",
          ]);
        })
      );

      feedPosts = userPosts;
      if (userFollowingsPosts.length){
        feedPosts = feedPosts.concat(userFollowingsPosts[0]);
      };

      if (friendsPosts.length){
        feedPosts = feedPosts.concat(friendsPosts[0]);
      }
      feedPosts = feedPosts.sort((p1, p2) => p2.date - p1.date);

      res.status(200).json(feedPosts);
    } catch (err) {
      next(err);
    }
  },
  followUser: async (req, res, next) => {
    const myUserId = req.body.userId;
    const followingUserId = req.params.userId;

    if (myUserId === followingUserId)
      return res.status(403).json({ message: "You cannot follow yourself!" });

    try {
      const followingUser = await User.findById(followingUserId);
      const me = await User.findById(myUserId);

      // Check if user is private and if i already sent a friend request to that user;
      if (
        followingUser.private &&
        !me.sentFriendRequests.includes(followingUserId)
      ) {
        // If the user is private create a notification for that user;
        // The user will receive a friend request notification;
        await Notification.create({
          from: myUserId,
          to: followingUserId,
          message: "You have a friend request from: ",
          kind: 1,
        });

        //Add following user to my sentFriendRequests array;
        me.sentFriendRequests.push(followingUserId);
        followingUser.receivedFriendRequests.push(myUserId);

        await me.save();
        await followingUser.save();

        const { password, private, ...userDetails } = me;

        return res.status(200).json({
          message: "Friend request has been sent!",
          friendRequest: true,
          user: userDetails,
        });
      }

      // Cancel friend request if user is private and i already sent a friend request;
      if (
        followingUser.private &&
        me.sentFriendRequests.includes(followingUserId)
      ) {
        await me.updateOne({ $pull: { sentFriendRequests: followingUserId } });
        await followingUser.updateOne({
          $pull: { receivedFriendRequests: myUserId },
        });

        // Remove notification for the user, so he cannot see it;
        await Notification.deleteOne({
          from: myUserId,
          to: followingUser,
          kind: 1,
        });

        const { password, private, ...userDetails } = me;

        return res.status(200).json({
          message: "Friend request has been cancelled!",
          friendRequest: true,
          user: userDetails,
        });
      }

      if (
        !followingUser.private &&
        followingUser.followers.includes(myUserId)
      ) {
        await me.updateOne({ $pull: { following: followingUserId } });
        await followingUser.updateOne({
          $pull: { followers: myUserId },
        });

        const { password, private, ...userDetails } = me;

        return res.status(200).json({
          message: "User has been unfollowed!",
          followRequest: true,
          user: userDetails,
        });
      }

      if (
        !followingUser.private &&
        !followingUser.followers.includes(myUserId)
      ) {
        await me.updateOne({ $push: { following: followingUserId } });
        await followingUser.updateOne({
          $push: { followers: myUserId },
        });

        const { password, private, ...userDetails } = me;

        return res.status(200).json({
          message: "User has been followed!",
          followRequest: true,
          user: userDetails,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  removeFriend: async (req, res, next) => {
    const { userId: friendId } = req.params;
    const { userId: myId } = req.body;

    try {
      await User.findByIdAndUpdate(friendId, { $pull: { friends: myId } });
      await User.findByIdAndUpdate(myId, { $pull: { friends: friendId } });

      res.status(200).json({ message: "User has been removed from friends!" });
    } catch (err) {
      next(err);
    }
  },
  respondRequest: async (req, res, next) => {
    const { userId: senderId } = req.params;
    const { userId: myId, accept } = req.body;

    try {
      if (accept) {
        await User.findByIdAndUpdate(myId, {
          $pull: { receivedFriendRequests: senderId },
          $push: { friends: senderId },
        });
        await User.findByIdAndUpdate(senderId, {
          $pull: { sentFriendRequests: myId },
          $push: { friends: myId },
        });

        return res
          .status(200)
          .json({ message: "User has been added to friends." });
      } else {
        await User.findByIdAndUpdate(myId, {
          $pull: { receivedFriendRequests: senderId },
        });
        await User.findByIdAndUpdate(senderId, {
          $pull: { sentFriendRequests: myId },
        });
        return res.status(200).json({
          message: "User request has been rejected.",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  editUser: async (req, res, next) => {
    const userId = req.params.userId;
    // const {bio, from, lives, position, work, relationship, school, university} = req.body;
    const { coverPicture, profilePicture, ...reqBody } = req.body;

    try {
      //Create url for coverPicture if it exists
      if (req.files.coverPicture) {
        reqBody.coverPicture =
          process.env.BACKEND_UPLOADS + req.files.coverPicture[0].filename;
        //Find corresponding album and save photo there
        const coverPicturesAlbum = await Album.findOne({
          userId,
          name: "Cover pictures",
        });
        await Photo.create({
          url: reqBody.coverPicture,
          userId: userId,
          albumId: coverPicturesAlbum._id,
        });
      }
      //Create url for coverPicture if it exists
      if (req.files.profilePicture) {
        reqBody.profilePicture =
          process.env.BACKEND_UPLOADS + req.files.profilePicture[0].filename;
        //Find corresponding album and save photo there
        const profilePicturesAlbum = await Album.findOne({
          userId,
          name: "Profile pictures",
        });
        await Photo.create({
          url: reqBody.profilePicture,
          userId: userId,
          albumId: profilePicturesAlbum._id,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(userId, reqBody, {
        new: true,
      });
      const { password, private, ...otherDetails } = updatedUser._doc;

      return res.status(200).json(otherDetails);
    } catch (err) {
      next(err);
    }
  },
  search: async (req, res, next) => {
    const query = req.body.query;
    const queryRegx = new RegExp(query, "i");

    try {
      const users = await User.find({
        $or: [
          { firstName: { $regex: queryRegx } },
          { lastName: { $regex: queryRegx } },
          { username: { $regex: queryRegx } },
        ],
      })
        .select("firstName lastName username profilePicture _id")
        .limit(8);

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },
  getPhotos: async (req, res, next) => {
    try {
      const photos = await Photo.find({ userId: req.params.userId });

      return res.status(200).json(photos);
    } catch (err) {
      next(err);
    }
  },
  getVideos: async (req, res, next) => {
    try {
      const videos = await Video.find({ userId: req.params.userId });

      return res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  },
  getAlbums: async (req, res, next) => {
    try {
      const albums = await Album.find({ userId: req.params.userId });

      return res.status(200).json(albums);
    } catch (err) {
      next(err);
    }
  },
  getNotifications: async (req, res, next) => {
    const { userId } = req.params;
    const { read } = req.query;

    try {
      const mongoQuery = { to: userId };

      if (read) {
        mongoQuery.read = read;
      }

      const notifications = await Notification.find(mongoQuery).populate(
        "from",
        ["firstName", "lastName", "profilePicture", "_id", "username"]
      );

      return res.status(200).json(notifications);
    } catch (err) {
      next(err);
    }
  },
};
