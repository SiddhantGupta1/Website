const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (e, decodedToken) => {
        if (decodedToken) {
          req.user = await User.findOne({ _id: decodedToken._id });
          req.token = token;
          next();
        } else {
          return next({
            status: 403,
            message: "User not logged in",
          });
        }
      });
    } else {
      return next({
        status: 403,
        message: "User not logged in.",
      });
    }
  } catch (e) {
    return next({
      status: 403,
      message: "User not logged in.",
    });
  }
};

// Check Current User
const checkUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (e, decodedToken) => {
        console.log(decodedToken);
        if (decodedToken && decodedToken.role === "user") {
          req.user = await User.findOne({ _id: decodedToken._id });
          req.token = token;
          next();
        }
      });
    } else {
      return next({
        status: 403,
        message: "User not logged in.",
      });
    }
  } catch (e) {
    return next({
      status: 401,
      message: "Unauthorized User",
    });
  }
};

module.exports = { requireAuth, checkUser };
