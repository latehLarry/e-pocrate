const { addBooking, getBookings } = require('../controllers/patient.controller');
let User = require('../models/user.model');
let Patient = require('../models/patient.model');
let Doctor = require('../models/doctor.model');
let Booking = require('../models/bookings.model');
let Sibling = require('../models/sibling.model');

  exports.getUserByUsername = async (username)=> {
    return User.findOne({
      username: username
    });
  };
  exports.createUserDoctor = async (username, password, doctorId) => {
    let user = new User({
      username,
      password,
      role: 'doctor'
    })
    let saved = await user.save();
    Doctor.findByIdAndUpdate(doctorId, {
      userId: saved._id
    })
  };
  exports.createUserPatient = async (username, password, patientId) => {
    let user = new User({
      username,
      password,
      role: 'patient'
    });
    let saved =  await user.save();
    return Patient.findByIdAndUpdate(patientId, {
      userId: saved._id
    })
  };
  exports.addBooking = async ({date, time, isForSibling, sibling, complain, doctorId, type}, userId) => {
    if (isForSibling) {
      let sibling = new Sibling({
        ...sibling
      });
      await sibling.save();
    }
    let booking = new Booking({
      date,
      userId,
      time,
      isForSibling,
      sibling,
      complain,
      doctorId,
      type,
      sibling: sibling._id
    });

    return booking.save();
  };
  exports.getBookings = async (userId) => {
    return Booking.find({
      userId
    })
    .populate(['userId', 'doctorId'])
  }
