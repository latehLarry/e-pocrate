const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");

userRouter.post("/login", userController.authenticate);


module.exports = userRouter;