import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Ensure the environment variable is defined
const uri: string = process.env.MONGO_DB_URI ?? "";

export const connectToMongoDB = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_DB_URI environment variable is not set.");
    }
    await mongoose.connect(uri, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
