const Patient = require("../models/patient.model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const userService = require("../services/userService");
const { mailService } = require("../services/mailService");

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
    gender: req.body.gender,
    creation_date: Date.now(),
  });
  patient.save(async (err, doc) => {
    if (!err){ 
      console.log({userService})
      await userService.createUserPatient(req.body.email, req.body.password, doc._id);
      await mailService.sendDoctorCreation({email: doc.email});
      res.send(doc);
    }
    else {
      if (err.code == 11000)
        res.status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      else return next(err);
    }
  });
}

exports.addBooking = async (req, res) => {
  let {date, time, isForSibling, sibling, complain, doctorId, type} = req.body;
  try {
    let patient = await Patient.findOne({userId: req._id});
    let booking = await userService.addBooking({date, time, isForSibling, sibling, complain, doctorId, type}, patient._id)
    res.send({
      booking
    })
  } catch (error) {
    console.log(error);
    res.status(406).send({
      message: 'erreur lors de la réservation'
    })
  }
}

exports.getBookings = async (req, res) => {
  try {
    let patient = await Patient.findOne({userId: req._id});
    let bookings = await userService.getBookings(patient._id)
    res.send({
      bookings
    })
  } catch (error) {
    console.log(error);
    res.status(406).send({
      message: 'erreur lors de la réservation'
    })
  }
}
exports.getFiles = async (req, res) => {
  try {
    let patient = await Patient.findOne({userId: req._id});
    let files = await userService.getFiles(patient._id)
    res.send({
      files
    })
  } catch (error) {
    console.log(error);
    res.status(406).send({
      message: 'erreur lors de la réservation'
    })
  }
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

exports.getPatientById = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({userId: req.params.id});
    console.log("id", req.params.id)
    console.log(patient);
    res.send(patient);
  } catch (error) {
    res.status(406).send({
      message: "unknown"
    })
  }
  
}