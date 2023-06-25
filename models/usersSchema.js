const { model, Schema } = require("mongoose");

const UserScheme = new Schema({
  userName: {
    type: String,
    required: [true, "userName is required"],
    minLength: [3, "userName length must be at least 3 characters"],
    maxLength: [50, "userName cannot exceed more than 50 characters"],
  },
  email: { type: String, required: [true, "email is required"] },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "Password must be at least 8 characters"],
  },
  image: {
    type: String,
    required: [false],
  }
});

UserScheme.path("email").validate((email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
});

const User = model("User", UserScheme);

module.exports = User;
