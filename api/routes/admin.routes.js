const express = require("express");
const adminRouter = express.Router();
const ctrlAdmin = require("../controllers/admin.controller");
const extractPhoto = require("../files/doctor.images");
const jwtHelper = require("../config/jwtHelper");

adminRouter.post("", extractPhoto, ctrlAdmin.addAdmin);
adminRouter.post("/add-doctor", extractPhoto, ctrlAdmin.addDoctorByAdmin);
adminRouter.post("/admin-login", ctrlAdmin.authenticate);
adminRouter.get("/admin-profile", jwtHelper.verifyJwtToken, ctrlAdmin.adminProfile);

module.exports = adminRouter;

