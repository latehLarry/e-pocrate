const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cvSchema = new Schema({
    fullname: {type: String},
    cv: {type: String}
});

module.exports = mongoose.model("Cv", cvSchema, "cvs");
