const Message = require("../models/message");

module.exports = {
  getMessages: async (req, res, next) => {
    const conversationId = req.params.conversationId;

    try {
      const messages = await Message.find({ conversationId: conversationId });

      res.status(200).json(messages);
    } catch (err) {
      console.log(err);
    }
  },
  sendMessage: async (req, res, next) => {
    const { from, to, conversationId, message } = req.body;

    try {
      const newMessage = new Message({ from, to, message, conversationId });
      await newMessage.save();
      res.status(201).json(newMessage._doc);
    } catch (err) {
      console.log(err);
    }
  },
};
