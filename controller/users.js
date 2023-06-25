const User = require("../models/usersSchema");
const Habit = require("../models/habitsSchema");
const { hashFunction } = require("../bcrypt/bcrypt");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.getUser = async (request, response) => {
  const { userId } = request.params;
  try {
    const userInfo = await User.findById(userId);
    response.status(200).json(userInfo);
  } catch (err) {
    response.status(500).json({ error: err });
  }
};
exports.getUserHabits = async (request, response) => {
  const { userId } = request.params;
  try {
    const allHabits = await Habit.find({ owner: userId });
    response.send(allHabits);
  } catch (err) {
    console.log(err);
  }
};
exports.createUser = async (request, response) => {
  const { userName, email, password, image } = request.body;
  if (password.length >= 8) {
    const hashedPassword = hashFunction(password);
    try {
      const createdUser = await User.create({
        userName: userName,
        email: email,
        image: image,
        password: hashedPassword,
      });
      return response.status(201).json(createdUser);
    } catch (err) {
      return response
        .status(500)
        .json({ validationMessage: `${err} is the error` });
    }
  } else {
    return response
      .status(500)
      .json({ validationMessage: "Password must be at least 8 characters" });
  }
};
exports.updateUser = async (request, response) => {
  const { userId } = request.params;
  const { userName, email, password, image } = request.body;
  // constUserData = { userName, email, hashedPassword, image };
  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        userName: userName,
        email: email,
        image: image,
        password: password,
      },
      request.newData
    );
    return response
      .status(202)
      .json({ message: "successfully updated the user" });
  } catch (err) {
    return response.status(500).json({ message: err });
  }
};
exports.deleteUser = async (request, response) => {
  const { userId } = request.params;
  try {
    await User.findByIdAndRemove({ _id: userId });
    return response
      .status(202)
      .json({ message: "successfully removed the user" });
  } catch (err) {
    return response.status(500).json({ message: err + "do sum" });
  }
};
