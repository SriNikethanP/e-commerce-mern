import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.controller.js";
import { adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/new", newUser);

router.get("/all", adminOnly, getAllUsers);

router.get("/:id", getUser);

router.delete("/:id", adminOnly, deleteUser);

export default router;
