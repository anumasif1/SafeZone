var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChatSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
});

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;