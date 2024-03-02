const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

//comment oluşturmak için create
//buraya ulaşmak için users/:userId/posts/:postId/comments/

exports.createComment = async (req, res) => {
  const { commentText, ownerPost, ownerUser } = req.body;
  //böyle bir post un olup olmadığını postId ile kontrol et
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
    //burada bu comment._id değerini post içindeki listeye pushlamamız gerek
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

//post a ait olan commentleri getirmek için bir get
//buraya ulaşmak için users/:userId/posts/:postId/comments/

exports.getComments = async (req, res) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(404).json({ status: "error" });
  }
  const comments = await Post.findById(postId).populate("comments");
  res.status(200).json({ status: "success", message: comments.comments });
};

//post a ait olan spesifik bir commenti getirmek için  bir get
//buraya ulaşmak için users/:userId/posts/:postId/comments/:commentId

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
