const express = require("express");
const router = express.Router();
const { authLoginWithJwt } = require("../authentication/authMiddleware");

router.post("/login", authLoginWithJwt);

module.exports = router;
