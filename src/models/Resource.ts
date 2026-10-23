import { Schema, model } from "mongoose";
import type { ResourceDoc } from "../types/index";

const resourceSchema = new Schema<ResourceDoc>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    uppercase: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
});

resourceSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Resource = model<ResourceDoc>("Resource", resourceSchema);