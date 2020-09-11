const Admin = require("../models/admin.model");
const passport = require('passport');
const lodash = require("lodash");

exports.addAdmin = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');

    const admin = new Admin ({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        tel: req.body.tel,
        dob: req.body.dob,
        photo: url + '/uploads/images/doctors/' + req.file.filename,
        address: req.body.address,
        city: req.body.city,
        ctry: req.body.ctry
    });
    admin.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Compte administrateur créer avec success!",
        });
      })
      .catch(error => {
        res.status(501).json({
          message: "Soumision des données echoué!"
        })
      }) 
}

exports.authenticate = (req, res, next) => {
  //call for passport authentication
  passport.authenticate("admin-rule", (err, admin, info) => {
    //error handling
    if (err)
      return res.status(400).json(err);
    // success auth handling
    else if (admin)
      return res.status(200).json({ "token": admin.generateJwt() });
    //unknown admin handling
    else
      return res.status(404).json(info);
  })(req, res);
}

exports.adminProfile = (req, res, next) => {
  Admin.findOne({ _id: req._id },
    (err, admin) => {
      if (!admin)
        return res.status(404).json({ status: false, message: 'Utilisateur introuvable' });
      else
        return res.status(200).json({ status: true, admin: lodash.pick(admin, ['_id', 'name', 'surname', 'admin_photo', 'email', 'tel', 'address', 'username', 'password']) });
    }
  );
}