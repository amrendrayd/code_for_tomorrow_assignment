import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/category.controller";

const router = express.Router();

router.post("/category", protect, addCategory);
router.get("/categories", protect, getCategories);
router.put("/category/:categoryId", protect, updateCategory);
router.delete("/category/:categoryId", protect, deleteCategory);

export default router;


