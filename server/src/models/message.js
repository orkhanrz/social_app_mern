const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema({
  from: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    min: 1,
  },
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", MessageSchema);
