const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.singUser = async (req, res) => {
  const { email, name, password, passwordConfirm, posts } = req.body;
  if (!email || !name || !password || !passwordConfirm || !posts) {
    return res
      .status(404)
      .json({ status: "error", message: "Please fill the all fields" });
  }
  try {
    const user = await User.create({
      email,
      name,
      password,
      passwordConfirm,
      posts,
    });
    if (!user) {
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
    const token = signToken(user._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ status: "error", message: "Please provide email or password" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res
      .status(401)
      .json({ status: "error", message: "Incorrect email or password" });
  }
  const token = signToken(user._id);
  res.status(200).json({ status: "success", token, message: user });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  //we will check this email  in the database and then send a reset link to

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "No user with this email" });
  }
  // generate a random string for token
  const resetToken = user.getPasswordResetToken();
  user.save({ validateBeforeSave: false });

  //send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/${resetToken}`;

  const message = `If you requested this password reset, simply click the link below to choose a new, secure password.${resetURL} `;

  await sendEmail({
    email: user.email,
    subject: "Your password token (valid for 10 minutes)",
    message: message,
  });

  res.status(200).json({ status: "success", message: message });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, newPasswordConfirm } = req.body;
  const resetToken = req.params.token;
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in ! Please log in to get access!",
    });
  }
  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    //Check if user still exists
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Token is valid but user doesn't exist in database",
      });
    }
    //Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decode.iat)) {
      return res.status(401).json({
        status: "error",
        message: "User recently changed password! Please log in again.",
      });
    }
  } catch (error) {
    return res.status(401).json({ status: "error", message: error });
  }

  next();
};
