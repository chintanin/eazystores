const express = require("express");
const router = express.Router();

const storesController = require("../controller/storesController");

router.post("/sign-up", storesController.createStore);

router.post("/stores/network-issue", storesController.storesCaptureTooManySendOtpAttempts);

module.exports = router;
