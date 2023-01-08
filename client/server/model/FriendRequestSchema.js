const mongoose = require("mongoose");

const FriendRequestSchema = new mongoose.Schema({

    requester: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const FriendRequest = mongoose.model("friendrequest", FriendRequestSchema);

module.exports = FriendRequest;