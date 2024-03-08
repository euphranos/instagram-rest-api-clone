const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const commentController = require("../controller/commentController");
const postController = require("../controller/postController");
const authController = require("../controller/authController");

// user routes
userRouter
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, userController.createUser);

userRouter
  .route("/:userId")
  .get(authController.protect, userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

//post routes

userRouter
  .route("/:userId/posts/:postId")
  .get(authController.protect, postController.getPost);

userRouter
  .route("/:userId/posts")
  .post(authController.protect, postController.createPost)
  .get(authController.protect, postController.getPosts);

// comment routes
userRouter
  .route("/:userId/posts/:postId/comments")
  .post(authController.protect, commentController.createComment)
  .get(authController.protect, commentController.getComments);

userRouter
  .route("/:userId/posts/:postId/comments/:commentId")
  .get(authController.protect, commentController.getComment);

module.exports = userRouter;
