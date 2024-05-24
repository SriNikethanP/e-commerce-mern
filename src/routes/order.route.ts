import express from "express";
import {
  MyOrders,
  allOrders,
  deleteOrder,
  getSingleOrder,
  newOrder,
  processOrder,
} from "../controllers/order.controller.js";
import { adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/new", newOrder);

router.get("/my", MyOrders);

router.get("/all", adminOnly, allOrders);

router
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default router;
