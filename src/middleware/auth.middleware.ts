import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";

export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.query;
    if (!id) throw new Error("Invalid Request");

    const user = await User.findById(id);

    if (!user) throw new Error("User not found");

    if (user.role != "admin")
      res
        .status(402)
        .json({ error: "You don't have access to admin dashboard" });

    next();
  } catch (error) {
    console.log("Error in logging in admin", error);
    res.status(401).json({ error: "Only admin can access the data" });
  }
};
