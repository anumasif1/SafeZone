var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    username: {
        type: String,
        index: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        default: "guest"
    },
    address: {
        type: String,
        required: true
    },
    content: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chat"
        }
    ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;