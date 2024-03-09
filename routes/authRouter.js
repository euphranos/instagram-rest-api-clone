const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

//auth routes

authRouter.route("/signin").post(authController.singUser);
authRouter.route("/login").post(authController.loginUser);
authRouter.route("/forgotPassword").post(authController.forgotPassword);

module.exports = authRouter;
