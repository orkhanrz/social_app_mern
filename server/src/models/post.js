const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = Schema({
    text: {
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    likes: [],
    comments: [],
    shares: []
})

module.exports = mongoose.model('Post', PostSchema);