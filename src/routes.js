import { Router } from "express";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const router = Router();

// User routes
router.post("/user", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findOneUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// Post routes
router.post("/post/user/:id", PostController.createPost);
router.get("/posts", PostController.findAllPosts);
router.put("/post/:id", PostController.updatePost);
router.delete("/post/:id", PostController.deletePost);

export { router };
