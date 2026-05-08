import { Router } from "express";
import postController from "../controller/postController";
import userController from "../controller/userController";
import storyController from "../controller/storyController";
import notificationController from "../controller/notificationController";
import authController from "../controller/authController";
import { authMiddleware } from "../Middleware/authMiddleware";


const router = Router();

router.post("/posts", authMiddleware, postController.createPost);
router.post("/posts/:id/like", authMiddleware, postController.likePost);
router.post("/posts/:id/unlike", authMiddleware, postController.unlikePost);
router.post("/posts/:id/comment", authMiddleware, postController.commentPost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

router.delete("/users/:id", authMiddleware, userController.deleteUser);
router.post("/users/:id/follow", authMiddleware, userController.followUser);
router.post("/users/:id/unfollow", authMiddleware, userController.unfollowUser);

router.post("/stories", authMiddleware, storyController.createStory);
router.delete("/stories/:id", authMiddleware, storyController.deleteStory);

router.get("/notifications", authMiddleware, notificationController.getNotifications);
router.patch("/notifications/:id/read", authMiddleware, notificationController.markAsRead);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

export default router;