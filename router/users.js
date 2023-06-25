const express = require("express");
const router = express.Router();
// const { checkToken } = require("../authentication/jwt");
const {
  getUsers,
  getUser,
  createUser,
  getUserHabits,
  deleteUser,
  updateUser,
} = require("../controller/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.post("/", createUser);
router.get("/:userId/habits", getUserHabits);
router.delete("/:userId", deleteUser);
module.exports = router;
