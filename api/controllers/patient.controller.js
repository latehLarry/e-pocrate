const Patient = require("../models/Patient.model");
const mongoose = require("mongoose");

exports.patRegister = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const patient = new Patient({
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    tel: req.body.tel,
    dob: req.body.dob,
    photo: url + '/uploads/images/patients/' + req.file.filename,
    address: req.body.address,
    postal_code: req.body.postal_code,
    country: req.body.country,
    city: req.body.city,
    username: req.body.username + '@epocrate.com',
    gender: req.body.gender,
    password: req.body.password,
    creation_date: Date.now(),
    active: false,
  });
  patient.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      else return next(err);
    }
  });
}