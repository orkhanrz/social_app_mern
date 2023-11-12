const Post = require("../models/post");
const User = require('../models/user');

module.exports = {
  createPost: async (req, res, next) => {
    const { text, userId } = req.body;
    const media = req.file ? "/public/uploads/" + req.file.filename : null;

    if (!text) {
      return res.status(403).json({ text: "Please provide a text for post." });
    }

    try {
      const newPost = new Post({
        text,
        userId,
        media,
      });
      await newPost.save();
      const postId = newPost._doc._id;

      const user = await User.findById(userId);
      user.posts.push(postId);
      await user.save();

      return res.status(201).json(newPost._doc);
    } catch (err) {
      next(err);
    }
  },
};
