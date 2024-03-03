const User = require("../models/userModel");

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
    res.status(201).json({ status: "success", message: user });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
};
