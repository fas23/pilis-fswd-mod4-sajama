import { Router } from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  signIn,
  signUp,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//JWT
router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;
