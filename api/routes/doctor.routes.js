const express = require("express");
const docRouter = express.Router();
const ctrlDoctor = require("../controllers/doctor.controller");
const extractPhoto = require("../files/doctor.images");


docRouter.post("", extractPhoto, ctrlDoctor.docRegister);

module.exports = docRouter;