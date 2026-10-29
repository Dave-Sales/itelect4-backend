import type { Types } from "mongoose";

export type UserRole = "student" | "security_admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export type UserDoc = Omit<User, "id"> & {
  password: string;
};

export interface ResourceItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
}

export type ResourceDoc = Omit<ResourceItem, "id" | "userId"> & {
  userId: Types.ObjectId;
};

export type NewResourceBody = Pick<ResourceItem, "title" | "description" | "category">;

export interface CategoryData {
  id: string;
  slug: string;
  name: string;
}

export type CategoryDoc = Omit<CategoryData, "id">;

export interface ItemData {
  id: string;
  title: string;
  category: string;
  locationFound: string;
  description?: string;
  isResolved: boolean;
}

export type ItemDoc = Omit<ItemData, "id">;

export interface ClaimData {
  id: string;
  itemId: string;
  claimedByUserId: string;
  claimedAt: Date;
  notes?: string;
}

export type ClaimDoc = Omit<ClaimData, "id" | "itemId" | "claimedByUserId"> & {
  itemId: Types.ObjectId;
  claimedByUserId: Types.ObjectId;
};