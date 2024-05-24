import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";

export const newUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, _id, email, gender, role } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(200).json({ message: `Welcome, ${name}` });
      // return;
    }

    if (!name || !email || !_id || !gender)
      return res.status(400).json({ error: "Please fill all the credentials" });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      // password: hashedPassword,
      gender,
      role,
      _id,
    });

    await newUser.save();

    return res.status(200).json({
      // _id: newUser._id,
      // name: newUser.name,
      // email: newUser.email,
      // gender: newUser.gender,
      // role: newUser.role,

      message: `Sign in successfull`,
    });
  } catch (error) {
    console.log("Error in creating new user", error);
    return res.status(500).json({ error: "Error in creating user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.log("Error in getting all the users", error);
    res.status(400).json({
      error: "Cannot get all the users due to internal server issue",
    });
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getting the user", error);
    res.status(400).json({
      error: "Cannot get user due to internal server issue",
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    await user.deleteOne();

    return res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    console.log("Error in getting the user", error);
    res.status(400).json({
      error: "Cannot get user due to internal server issue",
    });
  }
};
