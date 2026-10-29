import { Router } from "express";
import { Category } from "../models/Category";

export const categoryRouter = Router();

categoryRouter.get("/", async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

categoryRouter.get("/:slug", async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    res.status(404).json({ message: "Category not found." });
    return;
  }

  res.json(category);
});
