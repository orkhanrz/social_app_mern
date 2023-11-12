const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/:username', userController.getUser);

router.get('/:userId/posts', userController.getUserPosts);

router.post('/:userId/follow', userController.followUser);

// router.get('/:userId/timeline', userController.getUserPosts);

module.exports = router;