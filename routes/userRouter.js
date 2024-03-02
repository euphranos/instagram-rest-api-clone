const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const commentController = require("../controller/commentController");
const postController = require("../controller/postController");

//user crud routeları
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//usera ait olan postlar için crud routeları

userRouter.route("/:userId/posts/:postId").get(postController.getPost);

userRouter
  .route("/:userId/posts")
  .post(postController.createPost)
  .get(postController.getPosts);

//usera ait olan postlara ait olan commentler için crud routeları
userRouter
  .route("/:userId/posts/:postId/comments")
  .post(commentController.createComment)
  .get(commentController.getComments);

userRouter
  .route("/:userId/posts/:postId/comments/:commentId")
  .get(commentController.getComment);

module.exports = userRouter;
