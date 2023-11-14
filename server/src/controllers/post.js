const { default: mongoose } = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

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
  likePost: async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.body.userId;

    try {
      const post = await Post.findById(postId);

      if (post.likes.includes(userId)) {
        post.likes.pull(userId);
      } else {
        post.likes.push(userId);
      }

      await post.save();

      return res.status(200).json({ message: "Post liked!" });
    } catch (err) {
      next(err);
    }
  },
  addComment: async (req, res, next) => {
    const { userId, text } = req.body;
    const { postId } = req.params;
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      text,
      userId,
      likes: [],
      date: Date.now(),
    };

    try {
      const post = await Post.findById(postId);
      post.comments.push(newComment);

      await post.save();

      return res.status(200).json(newComment);
    } catch (err) {
      next(err);
    }
  },
  getPostComments: async (req, res, next) => {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId).populate("comments.userId", [
        "_id",
        "firstName",
        "lastName",
        "profilePicture",
        "username",
      ]);
      const comments = post.comments;

      return res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  },
  likeComment: async (req, res, next) => {
    //:postId/comments/:commentId/like
    const userId = req.body.userId;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    try {
      const post = await Post.findById(postId);
      const comment = post.comments.find((c) => c._id == commentId);

      if (!comment.likes.includes(userId)) {
        comment.likes.push(userId);
      } else {
        comment.likes = comment.likes.filter((id) => id != userId);
      }

      await post.save();

      return res.status(200).json({ message: "Comment liked!" });
    } catch (err) {
      next(err);
    }
  },
};
