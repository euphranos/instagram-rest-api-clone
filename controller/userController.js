const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(404).json({
      status: "error",
      message: "Users list is empty",
    });
  }
  res
    .status(200)
    .json({ status: "success", result: users.length, data: users });
};
//create user
exports.createUser = async (req, res) => {
  const { email, name, password, posts } = req.body;
  if (!email || !name || !password || !posts) {
    res.status(400).json({
      status: "error",
      messge: "All fields are required",
    });
    return;
  }
  try {
    const user = await User.create({ email, name, password, posts });
    res.status(201).json({ status: "success", message: user });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({
        status: "error",
        message: "Email must be unique",
      });
    }

    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

//get specific user
exports.getUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(404)
      .json({ status: "error", message: "User doesnt exist" });
  }
  try {
    const user = await User.findById(id);
    res.status(200).json({ status: "success", message: user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
};
//update user

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, password } = req.body;
  if (!id) {
    return res
      .status(404)
      .json({ status: "error", message: "User doesnt exist" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, password },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.status(201).json({ status: "success", message: updatedUser });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ status: "error" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: "error" });
    }
    await User.findOneAndDelete(id);
    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err });
  }
};
