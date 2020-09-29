const Patient = require("../models/patient.model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//SMPTP credentialls
const transporter = nodemailer.createTransport({
  host: "mail.e-pocrate.com", //smtp url
  port: 465, //587
  secure: false,
  auth: {
    user: "no-reply@e-pocrate.com", //your webmail username
    pass: "@@Test1206epocrate"  //webmail password
  }
});

exports.patRegister = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const mailOption = {
    from :'no-reply@e-pocrate.com', // sender this is your email here
    to : `${req.body.email}`, // receiver email
    subject: "BIENVENUE SUR E-POCRATE",
    html: `<h1>BIENVENUE SUR E-POCRATE</h1> <br>
    Merci d\'avoir créer votre compte. Nous avons bien reçu votre demande d'inscription.
    vous pouvez á présent vous connecter a votre compte grace a ce lien <a href="www.e-pocrate.com/patient-login">Se Connecter</a>!!!`
}
  const patient = new Patient({
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
    username: req.body.username,
    gender: req.body.gender,
    password: req.body.password,
    creation_date: Date.now(),
  });
  patient.save((err, doc) => {
    if (!err){ 
      res.send(doc);
      transporter.sendMail(mailOption, (error, info) => {
        if(error) {
          console.log(error)
        } else {
          console.log("Email sent successfully:" + info);
        }
      });
    }
    else {
      if (err.code == 11000)
        res.status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      else return next(err);
    }
  });
}

//fetch all Patients
exports.getAllPatients = (req, res, next) => {
  Patient.find().then(data => {
    res.status(200).json({
      message: "Patients retrieved successfully",
      doctors: data
    })
  });
}

exports.getPatientById = (req, res, next) => {
  Patient.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}