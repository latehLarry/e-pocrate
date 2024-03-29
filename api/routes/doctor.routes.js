const express = require("express");
const docRouter = express.Router();
const ctrlDoctor = require("../controllers/doctor.controller");
const extractPhoto = require("../files/doctor.images");
const extractCv = require("../files/cv");

docRouter.post("/add-doctor", extractPhoto, ctrlDoctor.docRegister);
docRouter.post("/add-cv", extractCv, ctrlDoctor.addCv);
docRouter.get("/doctors-list", ctrlDoctor.getAllDoctors);
docRouter.get("/:id", ctrlDoctor.getDoctorById);
docRouter.put("/edit-doctor/:id", extractPhoto, ctrlDoctor.updateDoctorInfo);
docRouter.delete("/:id", ctrlDoctor.deleteDoctor);

module.exports = docRouter;