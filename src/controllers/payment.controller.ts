import { Request, Response } from "express";
import { Coupon } from "../models/coupon.model.js";
import { stripe } from "../app.js";

export const newCoupon = async (req: Request, res: Response) => {
  try {
    const { code, amount } = req.body;

    if (!code || !amount)
      throw new Error("Please enter both coupon-code and amount");

    await Coupon.create({
      code,
      amount,
    });

    res.status(200).json({
      message: `Coupon ${code} created successfully`,
    });
  } catch (error) {
    console.log("Cannot create coupon", error);
    res.status(400).json({ error: "Error in creating coupon" });
  }
};
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount) throw new Error("Please enter amount");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error in paymentIntent", error);
    res.status(400).json({ error: "Error in paymentIntent" });
  }
};
export const applyDiscount = async (req: Request, res: Response) => {
  try {
    const { coupon: code } = req.query;
    // console.log(code);

    const discount = await Coupon.findOne({ code });
    // console.log(discount);

    if (!discount) throw new Error("Invalid Coupon Code");

    res.status(200).json({
      discount,
    });
  } catch (error) {
    console.log("Cannot apply coupon", error);
    res.status(400).json({ error: "Couldn't apply discount" });
  }
};
export const allCoupons = async (req: Request, res: Response) => {
  try {
    const allCoupons = await Coupon.findOne({});

    res.status(200).json({
      allCoupons,
    });
  } catch (error) {
    console.log("Cannot find coupon", error);
    res.status(400).json({ error: "Couldn't find coupons" });
  }
};
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);

    res.status(200).json({
      message: `Coupon deleted successfully`,
    });
  } catch (error) {
    console.log("Cannot delete coupon", error);
    res.status(400).json({ error: "Couldn't delete coupon" });
  }
};
