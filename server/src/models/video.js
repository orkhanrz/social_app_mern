const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = Schema({
  url: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Video", VideoSchema);
