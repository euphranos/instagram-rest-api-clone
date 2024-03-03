const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const commentController = require("../controller/commentController");
const postController = require("../controller/postController");
const authController = require("../controller/authController");

// user routes
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//post routes

userRouter.route("/:userId/posts/:postId").get(postController.getPost);

userRouter
  .route("/:userId/posts")
  .post(postController.createPost)
  .get(postController.getPosts);

// comment routes
userRouter
  .route("/:userId/posts/:postId/comments")
  .post(commentController.createComment)
  .get(commentController.getComments);

userRouter
  .route("/:userId/posts/:postId/comments/:commentId")
  .get(commentController.getComment);

//auth routes

userRouter.route("/signin").post(authController.singUser);

module.exports = userRouter;
