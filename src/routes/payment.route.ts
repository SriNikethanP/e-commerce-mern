import express from "express";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.controller.js";
import { adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", createPaymentIntent);

router.post("/coupon/new", newCoupon);

router.get("/discount", applyDiscount);

router.get("/coupon/all", adminOnly, allCoupons);

router.route("/coupon/:id").delete(adminOnly, deleteCoupon);

export default router;
