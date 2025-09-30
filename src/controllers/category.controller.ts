import { Request, Response } from "express";
import Category from "../models/category.model";
import Service from "../models/service.model";

// Add a new category
export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name: name.trim() });
    await category.save();

    res.status(201).json(category);
  } catch (error: any) {
    console.error("Add Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name: name.trim() },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error: any) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a category (only if no services exist)
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    const services = await Service.find({ category: categoryId });

    if (services.length > 0) {
      return res.status(400).json({ message: "Category is not empty" });
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error: any) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
