const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '/public/images/noAvatar.png'
    },
    coverPicture: {
        type: String,
        default: '/public/images/noCover.png'
    },
    private: {
        type: Boolean,
        default: false,
    },
    work: String,
    position: String,
    university: String,
    universityField: String,
    school: String,
    from: String,
    lives: String,
    bio: String,
    relationship: String,
    followers: [],
    following: [],
    friends: [],
    posts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
    events: []
})

module.exports = mongoose.model('User', UserSchema);