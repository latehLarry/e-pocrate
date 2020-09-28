const express = require("express");
const patRouter = express.Router();
const ctrlPatient = require("../controllers/patient.controller");
const extractPhoto = require("../files/patient.images");


patRouter.post("/", extractPhoto, ctrlPatient.patRegister);
patRouter.get("/patients-list", ctrlPatient.getAllPatients);
patRouter.get("/:id", ctrlPatient.getPatientById);

module.exports = patRouter;