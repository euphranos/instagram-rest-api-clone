const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "You have to enter your email!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "You have to enter your name"],
  },

  password: {
    type: String,
    required: [true, "You have to enter your password"],
    select: false,
  },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
