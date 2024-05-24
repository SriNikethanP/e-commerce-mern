import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middleware/multer.middleware.js";
import { adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/new", adminOnly, singleUpload, newProduct);

router.get("/latest", getLatestProducts);

router.get("/all", getAllProducts);

router.get("/categories", getAllCategories);

router.get("/admin-products", getAdminProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default router;
