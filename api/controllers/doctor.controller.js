const Doctor = require("../models/doctor.model");
const Cv = require("../models/cv.model");
const nodemailer = require("nodemailer");
const { error } = require("protractor");
const { mailService } = require("../services/mailService");
const userService = require("../services/userService");
//SMPTP credentialls
const transporter = nodemailer.createTransport({
  host: "mail.e-pocrate.com", //smtp url
  port: 465, //587
  secure: false,
  auth: {
    user: "no-reply@e-pocrate.com", //your webmail username
    pass: "@@Test1206epocrate", //webmail password
  },
});

exports.docRegister = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  let {email} = req.body;
  console.log("req.body", req.body);
  let userAlreadyExist = await userService.getUserByUsername(email);
  if (userAlreadyExist) {
    return res
      .status(406)
      .send(["Le username est déja associée a un compte"]);
  }
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
    spec: JSON.parse(req.body.spec),
    ref_no: req.body.ref_no,
    doc_order: req.body.doc_order,
    faculty: req.body.faculty,
    city_obt: req.body.city_obt,
    ctry_obt: req.body.ctry_obt,
    gender: req.body.gender,
    creation_date: Date.now(),
    active: false,
  });
  doctor.save(async (err, doc) => {
    if (!err) {
      await userService.createUserDoctor(req.body.email, req.body.password, doc._id)
      res.send(doc);
      mailService.sendDoctorCreation({email: doc.email, password: req.body.password})
    } else {
      if (err.code == 11000) {
        res
          .status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      } else return next(err);
    }
  });
};


exports.addCv = (req, res, next) => {
  cvUrl = req.protocol + "://" + req.get("host");
  const cv = new Cv({
    fullname: req.body.fullname,
    cv: cvUrl + "/uploads/documents/doctors/" + req.file.filename,
  });
  cv.save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "CV bien soummis!",
      });
    })
    .catch((error) => {
      res.status(501).json({
        message: "Soummision CV echoué!",
      });
    });
};

//fetch all doctors
exports.getAllDoctors = (req, res, next) => {
  Doctor.find().then((data) => {
    res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors: data,
    });
  });
};

exports.getDoctorById = (req, res, next) => {
  Doctor.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

/*exports.updateDoctorInfo = (req, res, next) => {
  Doctor.findByIdAndUpdate(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
}*/

exports.updateDoctorInfo = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const imgurl = req.protocol + "://" + req.get("host");
    imagePath = imgurl + "/uploads/images/doctors/" + req.file.filename;
  }
  const doctor = new Doctor({
    _id: req.body.id,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    tel: req.body.tel,
    dob: req.body.dob,
    photo: imagePath,
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
    password: req.body.password,
    active: req.body.active,
  });
  Doctor.updateOne({ _id: req.params.id }, doctor).then((result) => {
    if (result) {
      res.status(200).json({ message: "Update done successfully!" });
    } else {
      res.status(500).json({ message: "Could not Update" });
    }
  });
  /*.catch(error => {
    res.status(500).json({message: "Could not Update!"});
  });*/
};

exports.deleteDoctor = (req, res, next) => {
  Doctor.deleteOne({ _id: req.params.id }).then((result) => {
    if (result) {
      res.status(200).json({ message: "Delete successful" });
    } else {
      res.status(500).json({ message: "Delete not successful" });
    }
  });
};
