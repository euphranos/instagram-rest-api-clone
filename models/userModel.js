const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "You have to enter your email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
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
  passwordConfirm: {
    type: String,
    required: [true, "You have to enter your password"],
    select: false,
    validation: function (el) {
      return el === this.password;
    },
  },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
