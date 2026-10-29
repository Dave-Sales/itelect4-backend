import { Router, type Request } from "express";
import { requireAuth } from "../middleware/auth";
import { Item } from "../models/Item";
import type { ItemData } from "../types";

interface ItemIdParams {
  id: string;
}

type NewItemBody = Omit<ItemData, "id">;
type UpdateItemBody = Partial<NewItemBody>;

export const itemRouter = Router();

itemRouter.use(requireAuth);

itemRouter.get("/", async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

itemRouter.get("/:id", async (req: Request<ItemIdParams>, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404).json({ message: "Item not found." });
    return;
  }

  res.json(item);
});

itemRouter.post("/", async (req: Request<unknown, unknown, NewItemBody>, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

itemRouter.patch(
  "/:id",
  async (req: Request<ItemIdParams, unknown, UpdateItemBody>, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      res.status(404).json({ message: "Item not found." });
      return;
    }

    res.json(item);
  }
);

itemRouter.delete("/:id", async (req: Request<ItemIdParams>, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    res.status(404).json({ message: "Item not found." });
    return;
  }

  res.status(204).send();
});
