const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
  to: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  kind: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", NotificationSchema);
