const { model, Schema } = require("mongoose");

const HabitSchema = new Schema({
  habitName: {
    type: String,
    required: [true, "habit name is required"],
  },
  habitGoal: {
    type: Number,
    required: [true, "habit goal is required"]
  },
  habitValue: {
    type: Number,
    required: [false]
  },
  habitCompleted: {
    type: String,
    required: [false],
  },
  habitDate: {
    type: Date,
    required: [false]
  },
  owner: { type: Schema.ObjectId, ref: "User", required: true },
});

const Habit = model("Habit", HabitSchema);

module.exports = Habit;
