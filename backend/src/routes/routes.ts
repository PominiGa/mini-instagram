import { Router } from "express";
import postController from "../controller/postController";
import userController from "../controller/userController";

const router = Router();

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.post("/posts", postController.createPost);
router.post("/posts/:id/like", postController.likePost);
router.post("/posts/:id/unlike", postController.unlikePost);
router.delete("/posts/:id", postController.deletePost);
router.post("/posts/:id/comment", postController.commentPost);

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.delete("/users/:id", userController.deleteUser);

router.post("/users/:id/follow", userController.followUser);
router.post("/users/:id/unfollow", userController.unfollowUser);

export default router;