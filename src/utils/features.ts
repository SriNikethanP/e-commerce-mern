import { Product } from "../models/product.model.js";

type OrderItemType = [
  {
    name: string;
    photo: string;
    price: number;
    quantity: number;
    productId: string;
  }
];

export const reduceStock = async (orderItems: OrderItemType) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};
