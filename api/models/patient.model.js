const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

let patSchema = new Schema({
  name: { type: String, required: "SVP entrer votre nom! <br>" },
  surname: { type: String, required: "SVP entrer votre prenom!" },
  email: { type: String, required: "SVP entrer votre addresse email!", unique: true },
  tel: { type: String, required: "SVP entrer votre numero de telephone!" },
  dob: { type: String, required: "SVP entrer votre date de naissance!" },
  photo: { type: String, required: "SVP mettez votre photo de profile!" },
  address: { type: String, required: "SVP entrer votre addresse!" },
  postal_code: { type: String, required: "SVP entrer votre code postal!" },
  country: { type: String, required: "SVP entrer votre pays de résidence!" },
  city: { type: String, required: "SVP entrer votre ville de résidence!" },
  username: { type: String, required: "SVP entrer votre nom d\'utilisateur!" },
  gender: { type: String, required: "SVP precisez votre sexe!" },
  password: { type: String, required: "SVP entrer un mot de passe!", minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"] },
  certify: { type: String },
  creation_date: { type: Date, required: true },
  salt_secret: String
});


patSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Le format de votre addresse email est invalide");


//Events for password security
patSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.salt_secret = salt;
      next();
    });
  });
});

patSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

patSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}



module.exports = mongoose.model("Patient", patSchema, "patients");
