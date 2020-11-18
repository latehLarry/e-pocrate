const Admin = require("../models/admin.model");
const passport = require('passport');
const lodash = require("lodash");
const Doctor = require("../models/doctor.model");
exports.authenticate = (req, res, next) => {
  //call for passport authentication
  passport.authenticate("user-rule", (err, user, info) => {
    //error handling
    if (err)
      return res.status(400).json(err);
    // success auth handling
    else if (user)
      return res.status(200).json({ "token": user.generateJwt(), user });
    //unknown admin handling
    else
      return res.status(404).json(info);
  })(req, res);

}