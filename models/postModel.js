const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    postTitle: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postDescribe: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timeStamps: true }
);

const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
