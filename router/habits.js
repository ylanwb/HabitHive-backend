const express = require("express");
const router = express.Router();

const {
  createHabit,
  getHabits,
  getHabit,
  deleteHabit,
  updateHabit,
} = require("../controller/habits");

router.get("/", getHabits);
router.get("/:habitId", getHabit);
router.post("/", createHabit);
router.put("/:habitId", updateHabit);
router.delete("/:habitId", deleteHabit), (module.exports = router);

module.exports = router;
