import { model, Schema } from "mongoose";
import type { CategoryDoc } from "../types";

const categorySchema = new Schema<CategoryDoc>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

categorySchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Category = model<CategoryDoc>("Category", categorySchema);
