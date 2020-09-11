const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tel: {type: String, required: true},
    dob: {type: String, required: true},
    photo: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    ctry: {type: String, required: true}
});

adminSchema.plugin(uniqueValidator);

adminSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
  }, "Le format de votre addresse email est invalide");
  
  
  //Events for password security
  adminSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        this.salt_secret = salt;
        next();
      });
    });
  });
  
  adminSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  adminSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP
      });
  }

module.exports = mongoose.model("Admin", adminSchema, "admin");