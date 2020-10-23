const Admin = require("../models/admin.model");
const passport = require('passport');
const lodash = require("lodash");
const Doctor = require("../models/doctor.model");
const cryptoRandomString = require('crypto-random-string');
const { mailService } = require("../services/mailService");


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
        console.log(error)
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

exports.addDoctorByAdmin = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const mailOption = {
    from: "no-reply@e-pocrate.com", // sender this is your email here
    to: `${req.body.email}`, // receiver email
    subject: "BIENVENUE SUR E-POCRATE",
    html: `<h1>BIENVENUE SUR E-POCRATE</h1> <br>
    Merci d\'avoir créer votre compte médecin. Nous traitons votre demande d'inscription et 
    vous recevrez un mail dés que votre inscription sera confirmée!!!`,
  };
  let password = cryptoRandomString({length: 10});
  const doctor = new Doctor({
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    tel: req.body.tel,
    dob: req.body.dob,
    photo: url + "/uploads/images/doctors/" + req.file.filename,
    address: req.body.address,
    postal_code: req.body.postal_code,
    country: req.body.country,
    city: req.body.city,
    spec: req.body.spec,
    ref_no: req.body.ref_no,
    doc_order: req.body.doc_order,
    faculty: req.body.faculty,
    city_obt: req.body.city_obt,
    ctry_obt: req.body.ctry_obt,
    username: req.body.username,
    gender: req.body.gender,
    password: password,
    creation_date: Date.now(),
    active: false,
  });
  doctor.save((err, doc) => {
    if (!err) {
      res.send(doc);
      mailService.sendDoctorCreation({email: doc.email, password: password})
    } else {
      if (err.code == 11000) {
        res
          .status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      } else return next(err);
    }
  });
};