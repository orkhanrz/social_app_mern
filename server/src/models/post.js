const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    media: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    },
    likes: [],
    comments: [],
    shares: []
})

module.exports = mongoose.model('Post', PostSchema);