const Doctor = require("../models/doctor.model");
const mongoose = require("mongoose");

exports.docRegister = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const doctor = new Doctor({
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    tel: req.body.tel,
    dob: req.body.dob,
    photo: url + '/uploads/images/' + req.file.filename,
    address: req.body.address,
    postal_code: req.body.postal_code,
    country: req.body.country,
    city: req.body.city,
    ref_no: req.body.ref_no,
    doc_order: req.body.doc_order,
    faculty: req.body.faculty,
    city_obt: req.body.city_obt,
    ctry_obt: req.body.ctry_obt,
    username: req.body.username,
    gender: req.body.gender,
    password: req.body.password,
    creation_date: Date.now(),
    active: false,
  });
  doctor.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      else return next(err);
    }
  });
}