const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = Schema ({
    message: {type: String},
    userID: {type: String},
    username: {type: String}
});

module.exports = mongoose.model("Message", messageSchema, "messages");