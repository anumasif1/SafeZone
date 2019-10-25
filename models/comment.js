const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;