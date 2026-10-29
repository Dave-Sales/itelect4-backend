import { model, Schema } from "mongoose";
import { ITEM_CATEGORIES } from "../config/categories";
import type { ItemDoc } from "../types";

const itemSchema = new Schema<ItemDoc>(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
    category: {
      type: String,
      enum: ITEM_CATEGORIES.map(({ name }) => name),
      required: true,
    },
    locationFound: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 160,
    },
    description: { type: String, trim: true, maxlength: 500 },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

itemSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Item = model<ItemDoc>("Item", itemSchema);
