const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = Schema ({
    message: {type: String},
    userID: {type: String},
    sentTo: {type: String},
    sentBy: {type: String},
    date: {type: Date},
    username: {type: String}
});

module.exports = mongoose.model("Message", messageSchema, "messages");