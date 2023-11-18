const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = Schema({
  url: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  albumId: {
    type: mongoose.Types.ObjectId,
    ref: "Album",
  },
});

module.exports = mongoose.model("Photo", PhotoSchema);
