const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

let docSchema = new Schema ({
  name: { type: String, required: "SVP entrer votre nom!" },
  surname: { type: String, required: "SVP entrer votre prenom!" },
  email: { type: String, required: "SVP entrer votre addresse email!", unique: true },
  tel: { type: String, required: "SVP entrer votre numero de telephone!" },
  dob: { type: Date, required: "SVP entrer votre date de naissance!" },
  photo: { type: String, required: "SVP mettez votre photo de profile!" },
  address: { type: String, required: "SVP entrer votre addresse!" },
  postal_code: { type: String, required: "SVP entrer votre code postal!" },
  country: { type: String, required: "SVP entrer votre pays de résidence!" },
  city: { type: String, required: "SVP entrer votre ville de résidence!" },
  spec: {
    value: {
      type: String
    },
    label: {
      type: String
    }
  },
  ref_no: { type: String, required: "SVP entrer votre numero d\'agrement!" },
  doc_order: { type: String, required: "SVP remplissez le champ suivant Étes-vous inscrit au tableau de l\'ordre des médecins de votre pays?!" },
  faculty: { type: String, required: "SVP remplissez votre faculté!" },
  city_obt: { type: String, required: "SVP remplissez la ville de la faculté!" },
  ctry_obt: { type: String, required: "SVP remplissez le pays d\'obtention du diplome!" },
  gender: { type: String, required: "SVP precisez votre sexe!" },
  certify: { type: String },
  creation_date: { type: Date, required: true },
  active: { type: Boolean, required: true },
  blocked: { type: Boolean, required: true, default: false },
  salt_secret: String,
  userId: {type: ObjectId, ref: 'User'}
});

docSchema.plugin(uniqueValidator);


docSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Le format de votre addresse email est invalide");


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



module.exports = mongoose.model("Doctor", docSchema, "doctors"); 
