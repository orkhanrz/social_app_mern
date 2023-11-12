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
        required: true
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
    school: String,
    from: String,
    followed: [],
    following: [],
    friends: [],
    photos: [],
    posts: [],
    events: []
})

module.exports = mongoose.model('User', UserSchema);