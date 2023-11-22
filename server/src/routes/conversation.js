const express = require("express");
const router = express.Router();

const conversationContraller = require('../controllers/conversations');
const authMiddleware = require('../middlewares/auth');

router.post("/users/:userId", authMiddleware, conversationContraller.createConversation);

router.get("/users/:userId", authMiddleware, conversationContraller.getConversationByUserId);

router.get("/:conversationId", authMiddleware, conversationContraller.getConversationById);

module.exports = router;
