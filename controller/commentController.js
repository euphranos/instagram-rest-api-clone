const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  const { commentText, ownerPost, ownerUser } = req.body;
  const postId = req.params.postId;

  const post = await Post.findById(postId);
  if (!post) {
    return res
      .status(404)
      .json({ status: "error", message: "Post is doesnt exist" });
  }
  if (!commentText || !ownerPost || !ownerUser) {
    return res
      .status(404)
      .json({ status: "error", message: "Please fill the all fields" });
  }
  try {
    const comment = await Comment.create({ commentText, ownerPost, ownerUser });
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment._id },
      },
      { new: true }
    );
    return res.status(201).json({ status: "success", message: comment });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error!" });
  }

  //
};

exports.getComments = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(404).json({ status: "error" });
  }
  const comments = await Post.findById(postId).populate("comments");
  res.status(200).json({ status: "success", message: comments.comments });
};

exports.getComment = async (req, res) => {
  const commentId = req.params.commentId;

  if (!commentId) {
    return res.status(404).json({ status: "error" });
  }
  try {
    const comment = await Comment.findById(commentId);
    res.status(200).json({ status: "success", message: comment });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
  }
};
