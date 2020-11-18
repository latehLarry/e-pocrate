const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let docSchema = new Schema ({
  username: { type: String, required: "SVP entrer votre nom d\'utilisateur!", unique: true },
  password: { type: String, required: "SVP entrer un mot de passe!", minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"] },
  role: { type: String, enum: ['patient', 'doctor'] },
  creation_date: { type: Date, required: true, default: Date.now },
  active: { type: Boolean, required: true, default: true },
  salt_secret: String
});

docSchema.plugin(uniqueValidator);


//Events for password security
docSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.salt_secret = salt;
      next();
    });
  });
});

docSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

docSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}



module.exports = mongoose.model("User", docSchema, "users"); 
