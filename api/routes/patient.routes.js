const express = require("express");
const patRouter = express.Router();
const ctrlPatient = require("../controllers/patient.controller");
const extractPhoto = require("../files/patient.images");
const jwtHelper = require("../config/jwtHelper");


patRouter.post("/", extractPhoto, ctrlPatient.patRegister);
patRouter.post("/bookings/", jwtHelper.verifyJwtToken, ctrlPatient.addBooking);
patRouter.get("/bookings/", jwtHelper.verifyJwtToken, ctrlPatient.getBookings);
patRouter.get("/patients-list", ctrlPatient.getAllPatients);
patRouter.get("/:id", ctrlPatient.getPatientById);

module.exports = patRouter;