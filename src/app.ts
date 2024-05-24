import express from "express";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";
const port = 3000;

const stripeKey = process.env.STRIPE_KEY || "";
export const stripe = new Stripe(stripeKey);
const app = express();

dotenv.config();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", userRoute);

app.use("/api/product", productRoute);

app.use("/api/order", orderRoute);

app.use("/api/payment", paymentRoute);

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
