const mongoose = require('mongoose');

const itemScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    items: [itemScheme]
})

module.exports = mongoose.model('Group', groupSchema)