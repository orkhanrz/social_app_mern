const Conversation = require("../models/conversation");

module.exports = {
  getConversationById: async (req, res, next) => {
    const conversationId = req.params.conversationId;

    try {
      const conversation = await Conversation.findById(conversationId);

      res.status(200).json(conversation);
    } catch (err) {
      next(err);
    }
  },
  getConversationByUserId: async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const conversations = await Conversation.find({
        users: { $in: userId },
      }).populate("users", ["_id", "firstName", "lastName", "profilePicture"]);

      res.status(200).json(conversations);
    } catch (err) {
      next(err);
    }
  },
  createConversation: async (req, res, next) => {
    try {
      let conversation = await Conversation.findOne({ users: { $all: [req.params.userId, req.body.userId] } });

      console.log(conversation);

      if (!conversation) {
        const newConversation = new Conversation({ users });
        const createdConversation = await newConversation.save();
        return res.status(201).json(createdConversation);
      }

      res.status(200).json(conversation);
    } catch (err) {
      next(err);
    }
  },
};
