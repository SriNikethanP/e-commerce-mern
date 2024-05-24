import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: String;
  email: String;
  // password: String;
  role: "user" | "admin";
  gender: "male" | "female";
  _id: String;
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
      unique: [true, "email already exists"],
      validate: validator.default.isEmail,
    },
    // password: {
    //   type: String,
    //   required: [true, "Please provide the"],
    //   minlength: 6,
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please select your gender"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
