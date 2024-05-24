import { Request, Response } from "express";
import { Order } from "../models/order.model.js";
import { reduceStock } from "../utils/features.js";

export const newOrder = async (req: Request, res: Response) => {
  try {
    const {
      shippingInfo,
      user,
      subtotal,
      tax,
      shippingcharges,
      orderItems,
      discount,
      total,
    } = req.body;

    if (!shippingInfo || !user || !subtotal || !tax || !orderItems || !total) {
      throw new Error("Please fill all the details");
    }

    // if (!shippingInfo) throw new Error("shippingInfo");
    // if (!user) throw new Error("user");
    // if (!subtotal) throw new Error("subtotal");
    // if (!tax) throw new Error("tax");
    // if (!orderItems) throw new Error("orderItems");
    // if (!total) throw new Error("total");

    const order = await Order.create({
      shippingInfo,
      user,
      subtotal,
      orderItems,
      tax,
      shippingcharges,
      discount,
      total,
    });

    await reduceStock(orderItems);
    await order.save();

    res.status(200).json({
      message: "Product placed successfully",
    });
  } catch (error) {
    console.log("Error in creating new order", error);
    res.status(400).json({
      error: "Error in creating new order",
    });
  }
};

export const MyOrders = async (req: Request, res: Response) => {
  try {
    const { id: user } = req.query; //the to find parameter should always be as what is created in model schema . We cannot use id as parameter as it doesn't match with user's id.We saved the id in user parameter in model schema so the id name must be user

    console.log(user);

    // console.log(orders);

    if (!user) throw new Error("Please provide valid userid");
    let orders = [];

    orders = await Order.find({ user });

    // (!orders)

    console.log(orders);

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log("Error in finding your order", error);
    res.status(400).json({
      error: "Error in finding your orders",
    });
  }
};
export const allOrders = async (req: Request, res: Response) => {
  try {
    let orders = [];

    orders = await Order.find().populate("user", "name");

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log("Error in finding your order", error);
    res.status(400).json({
      error: "Error in finding your orders",
    });
  }
};
export const processOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) throw new Error("Order not found");

    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;
      case "Shipped":
        order.status = "Delivered";
        break;

      default:
        order.status = "Delivered";
        break;
    }

    await order.save();

    res.status(200).json({
      message: "Order processed successfully",
    });
  } catch (error) {
    console.log("Error processing your order", error);
    res.status(400).json({
      error: "Couldn't process the order",
    });
  }
};
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) throw new Error("Order not found");

    await order.deleteOne();

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting your order", error);
    res.status(400).json({
      error: "Couldn't delete the order",
    });
  }
};
export const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; //Here we use "id" to search "_id" in model because we set the route as "/:id" so it also depends on that . as params id defined as id in route......But if we were to find the model not by findById but by find() then we should have the name as what is defined in the model. so the {id } must be renamed to {id:_id } and use find({}) instead of findById();

    // const { id: _id } = req.params;
    let order;
    // order = await Order.find({ _id });

    order = await Order.findById(id).populate("user", "name");
    // order = await Order.find({});

    if (!order) throw new Error("Order not found");

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.log("Error in finding your order", error);
    res.status(400).json({
      error: "Error in finding your orders",
    });
  }
};
