const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commentText: { type: String, required: true },
    ownerPost: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    ownerUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
