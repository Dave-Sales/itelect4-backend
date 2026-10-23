import "dotenv/config";
import mongoose from "mongoose";
import { ITEM_CATEGORIES } from "./config/categories";
import { connectDB } from "./config/db";
import { Category } from "./models/Category";

async function seedCategories() {
  try {
    await connectDB();
    await Promise.all(
      ITEM_CATEGORIES.map(({ slug, name }) =>
        Category.updateOne({ slug }, { $set: { name } }, { upsert: true })
      )
    );
    console.log(`Seeded ${ITEM_CATEGORIES.length} item categories.`);
  } finally {
    await mongoose.disconnect();
  }
}

void seedCategories().catch((error: unknown) => {
  console.error("Could not seed item categories:", error);
  process.exitCode = 1;
});
