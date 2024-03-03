const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    required: [true, "You have to enter your password confirm"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password confirmation must match the password.",
    },
    select: false,
  },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
