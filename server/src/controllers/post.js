const { default: mongoose } = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  createPost: async (req, res, next) => {
    const { text, userId } = req.body;
    const media = req.file;

    if (!text && !media) {
      return res.status(403).json({ text: "Please provide a text or an image for post." });
    }

    // Set a body for new post.
    const postBody = {text, userId};

    // Add photo/video url to post only if its provided.
    if (media){
      postBody.media = "/public/uploads/" + media.filename;
    }

    
    try {
      const newPost = new Post(postBody);
      await newPost.save();
      const postId = newPost._doc._id;

      //Also save post reference in user document.
      const user = await User.findById(userId);
      user.posts.push(postId);

      //If media exists also save it in user document.
      if (media){
        user.photos.push({url: "/public/uploads/" + media.filename});
      }
      
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
  editComment: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { text, userId } = req.body;
    const date = Date.now();

    try {
      const post = await Post.findById(postId);
      const comment = post.comments.find((c) => c._id == commentId);

      if (comment.userId != userId) {
        return res
          .status(403)
          .json({ message: "You cannot edit this comment!" });
      }

      comment.text = text;
      comment.date = date;

      await post.save();
      return res.status(200).json(comment);
    } catch (err) {
      next(err);
    }
  },
  deleteComment: async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = req.query;

    try {
      const post = await Post.findById(postId);
      const comment = post.comments.find((c) => c._id == commentId);

      if (comment.userId != userId) {
        return res
          .status(403)
          .json({ message: "You cannot delete this comment!" });
      }

      const updatedComments = post.comments.filter((c) => c._id != commentId);
      post.comments = updatedComments;
      await post.save();

      return res.status(200).json(updatedComments);
    } catch (err) {
      next(err);
    }
  },
};
