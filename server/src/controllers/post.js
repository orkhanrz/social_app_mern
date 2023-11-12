const Post = require('../models/post');

module.exports = {
    createPost: async (req, res, next) => {
        const {text, userId} = req.body;
        console.log(req.body);
        console.log(req.file);
    }
}