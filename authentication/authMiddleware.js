const { compareHash } = require("../bcrypt/bcrypt");
const User = require("../models/usersSchema");
const { tokenGenerate } = require("./jwt");

// register with jwt
module.exports.authRegister = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }],
    });
    if (user) {
      res.status(400).send({
        error: "Failed, email address is already in use",
      });
      return;
    } else {
      next();
      return;
    }
  } catch (err) {
    res.status(500).send({ emailMsg: err });
    return;
  }
};

// login with jwt
module.exports.authLoginWithJwt = async (req, res) => {
  const { email, password, id } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordMatch = compareHash(password, user.password);
      if (!isPasswordMatch) {
        return res.status(404).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = tokenGenerate(email, user._id);
      return res.status(200).json({
        success: true,
        data: {
          email: user.email,
          token: token,
          id: user._id,
        },
      });
    } else {
      res.status(404).send({ loginErr: "Invalid Email or Password" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: { err } });
  }
};
