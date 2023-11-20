const express = require("express");
const router = express.Router();

const messageController = require('../controllers/messages');

router.post('/', messageController.sendMessage);

router.get('/:conversationId', messageController.getMessages);

module.exports = router;