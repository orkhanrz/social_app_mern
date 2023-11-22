const express = require("express");
const router = express.Router();

const messageController = require('../controllers/messages');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, messageController.sendMessage);

router.get('/:conversationId', authMiddleware, messageController.getMessages);

module.exports = router;