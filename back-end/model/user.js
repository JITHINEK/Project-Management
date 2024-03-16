const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserModel)