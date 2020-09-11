const Doctor = require("../models/doctor.model");
const Cv = require("../models/cv.model");
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

exports.docRegister = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const mailOption = {
    from :'no-reply@e-pocrate.com', // sender this is your email here
    to : `${req.body.email}`, // receiver email
    subject: "BIENVENUE SUR E-POCRATE",
    html: `<h1>BIENVENUE SUR E-POCRATE</h1> <br>
    Merci d\'avoir créer votre compte médecin. Nous traitons votre demande d'inscription et 
    vous recevrez un mail dés que votre inscription sera confirmée!!!`
}
  const doctor = new Doctor({
    //_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    tel: req.body.tel,
    dob: req.body.dob,
    photo: url + '/uploads/images/doctors/' + req.file.filename,
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
    if (!err) {
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
      if (err.code == 11000){
        res.status(442)
          .send(["Cette addresse email est déja associée a un compte"]);
      }
      else return next(err);
    }  
  });
}

exports.addCv = (req, res, next) => {
  cvUrl = req.protocol + '://' + req.get('host');
  const cv = new Cv({
    fullname: req.body.fullname,
    cv: cvUrl + '/uploads/documents/doctors/' + req.file.filename,
  });
  cv.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "CV bien soummis!",
    });
  })
  .catch(error => {
    res.status(501).json({
      message: "Soummision CV echoué!"
    })
  })
}

//fetch all doctors
exports.getAllDoctors = (req, res, next) => {
  Doctor.find().then(data => {
    res.status(200).json({
      message: "Doctors retrieved successfully",
      doctors: data
    })
  });
}




