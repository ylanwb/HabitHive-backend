const express = require("express");
const router = express.Router();
const { authRegister } = require("../authentication/authMiddleware");
const { createUser } = require("../controller/users");

router.post("/register", authRegister, createUser);

module.exports = router;
