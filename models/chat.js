var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;