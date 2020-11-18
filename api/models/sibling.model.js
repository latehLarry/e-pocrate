const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let docSchema = new Schema ({
  name: { type: String, required: "SVP entrer votre prénom " },
  surname: { type: String, required: "SVP entrer un nom!", minlength: [2, "Le nom doit contenir au moins 2 caractères"] },
  age: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  country: { type: String },
  creation_date: { type: Date, required: true, default: Date.now },
});




module.exports = mongoose.model("Sibling", docSchema, "siblings"); 
