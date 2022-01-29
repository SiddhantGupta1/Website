const User = require("../models/User");

module.exports.signup = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log(token);
    res.status(201).send({ user, token });
  } catch (e) {
    return next({
      status: 400,
      message: "User not created",
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.hash_password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    return next({
      status: 400,
      message: "User not logged in",
    });
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    req.user.token = "";
    const user = req.user;
    await user.save();
    res.status(200).send({ user });
  } catch (e) {
    return next({
      status: 500,
      message: "User not logged out",
    });
  }
};
