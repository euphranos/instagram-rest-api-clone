const Post = require("../models/postModel");
const User = require("../models/userModel");

exports.getPosts = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(404).json({ status: "error" });
  }
  const posts = await User.findById(userId).populate("posts");
  if (posts.posts.length == 0) {
    return res
      .status(404)
      .json({ status: "error", message: "User doesnt have posts" });
  }
  res.status(200).json({ status: "success", message: posts });
};

exports.createPost = async (req, res) => {
  const userId = req.params.userId;
  const { postTitle, postDescribe, comments, likes, owner } = req.body;
  if (!postTitle || !postDescribe || !comments || !likes || !owner) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are mandatory" });
  }
  try {
    const post = await Post.create({
      postTitle,
      postDescribe,
      comments,
      likes,
      owner,
    });
    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: post._id } },
      { new: true }
    );
    res.status(201).json({ status: "success", message: post });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getPost = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.status(404).json({ status: "error" });
  }
  try {
    const post = await Post.findById(postId);
    res.status(200).json({ status: "success", message: post });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error!" });
  }
};

exports.deletePost = async (req, res) => {};
