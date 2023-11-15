const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
  ],
  shares: [],
});

module.exports = mongoose.model("Photos", PhotoSchema);
