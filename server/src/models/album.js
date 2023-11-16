const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  albumPicture: {
    type: String,
    default: '/public/images/noCover.png'
  },
  albumDesc: {
    type: String,
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
  items: {
    type: Number,
    default: 0
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Album", AlbumSchema);
