import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { rm } from "fs";
import { BaseQuery } from "../types/type.js";

export const newProduct = async (req: Request, res: Response) => {
  try {
    // console.log("working1");
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) throw new Error("Please upload the product photo");

    if (!name || !price || !stock || !category) {
      throw new Error("Please enter all the details.");
    }

    // console.log("working2");
    // console.log(name, price, stock, category);

    const newProduct = await Product.create({
      name,
      price,
      stock,
      category,
      photo: photo?.path,
    });
    // console.log("working3");

    await newProduct.save();
    // console.log("working4");

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("Cannot post new product", error);
    res.status(400).json({ error: "Error in posting new product" });
  }
};

export const getLatestProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(4);

    if (!products) throw new Error("No products found");

    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getting latest products", error);
    res.status(400).json({ error: "Cannot get latest products." });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct("category");

    res.status(200).json({ categories });
  } catch (error) {
    console.log("Error in getting latest products", error);
    res.status(400).json({ error: "Cannot get latest products." });
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // const { search, sort, category, price } = req.query;

    // const page = Number(req.query.page) || 1;

    // const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;

    // const skip = limit * (page - 1);

    // const baseQuery: BaseQuery = {};

    // if (search)
    //   baseQuery.name = {
    //     $regex: search,
    //     $options: "i",
    //   };
    // if (price)
    //   baseQuery.price = {
    //     $lte: Number(price),
    //   };
    // if (category) baseQuery.category = category;

    const products = await Product.find({});

    res.status(200).json({ products });

    
  } catch (error) {
    console.log("Error in getting all products", error);
    res.status(400).json({ error: "Cannot get all products." });
  }
};

export const getAdminProducts = async (req: Request, res: Response) => {
  try {
    const adminProducts = await Product.find({});

    if (!adminProducts) throw new Error("No products found");

    res.status(200).json({ adminProducts });
  } catch (error) {
    console.log("Error in getting latest products", error);
    res.status(400).json({ error: "Cannot get latest products." });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) throw new Error("No products found");

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in getting latest products", error);
    res.status(400).json({ error: "Cannot get latest products." });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) throw new Error("No products found");

    rm(product.photo!, () => {
      console.log("Photo Deleted");
    });

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log("Error in delete products", error);
    res.status(400).json({ error: "Cannot get  product." });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    // console.log("working1");

    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");

    if (photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    // console.log("working2");
    // console.log(name, price, stock, category);

    // console.log("working3");

    await product.save();
    // console.log("working4");

    return res.status(201).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("Cannot update product", error);
    res.status(400).json({ error: "Error in updating product" });
  }
};
