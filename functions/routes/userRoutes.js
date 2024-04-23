const express = require("express");
const router = express.Router();

const userController = require("../controller/usersController");

router.post("/sign-up", userController.createUser);

router.post("/network-issue", userController.captureTooManySendOtpAttempts);

module.exports = router;
