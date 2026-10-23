import type { Types } from "mongoose";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export interface ResourceItem {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export type ResourceDoc = Omit<ResourceItem, "id" | "userId"> & {
  userId: Types.ObjectId;
};

export type NewResourceBody = Pick<ResourceItem, "title" | "description" | "category">;