const express = require("express");
const router = express.Router();

const conversationContraller = require('../controllers/conversations');

router.post("/users/:userId", conversationContraller.createConversation);

router.get("/users/:userId", conversationContraller.getConversationByUserId);

router.get("/:conversationId", conversationContraller.getConversationById);

module.exports = router;
