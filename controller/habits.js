const Habit = require("../models/habitsSchema");

exports.getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find().exec();
    res.status(200).json(habits);
  } catch (error) {
    next(error);
  }
};
exports.getHabit = async (request, response) => {
  const { habitId } = request.params;
  try {
    const habitInfo = await Habit.findById(habitId);
    response.status(200).json(habitInfo);
  } catch (err) {
    response.status(500).json({ error: err });
  }
};
exports.createHabit = async (request, response) => {
  const { habitName, habitGoal, habitValue, habitCompleted, habitDate, userId } = request.body;
  try {
    const createdHabit = await Habit.create({
      habitName: habitName,
      habitGoal: habitGoal,
      habitValue: habitValue,
      habitCompleted: habitCompleted,
      habitDate: habitDate,
      owner: userId,
    });
    return response.status(201).json(createdHabit);
  } catch (err) {
    return response.status(500).json({ message: `${err} is the error` });
  }
};
exports.updateHabit = async (request, response) => {
  const { habitId } = request.params;
  const body = request.body;
  try {
    await Habit.findByIdAndUpdate({ _id: habitId }, body, request.newData);
    return response
      .status(202)
      .json({ message: "successfully updated the habit" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
exports.deleteHabit = async (request, response) => {
  const { habitId } = request.params;
  try {
    await Habit.findByIdAndRemove({ _id: habitId });
    return response
      .status(202)
      .json({ message: "successfully deleted the habit" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
