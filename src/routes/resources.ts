import { Router, type Request, type Response } from "express";
import { Resource } from "../models/Resource";
import { requireAuth } from "../middleware/auth";
import type { NewResourceBody } from "../types/index";

export const resourceRouter = Router();

resourceRouter.use(requireAuth);

interface IdParam {
  id: string;
}

resourceRouter.get("/", async (req: Request, res: Response) => {
  const items = await Resource.find({
    userId: req.userId,
  }).sort({ createdAt: -1 });
  res.json(items);
});

resourceRouter.get(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const item = await Resource.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      res.status(404).json({ message: "No item with that id" });
      return;
    }

    res.json(item);
  }
);

resourceRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, NewResourceBody>,
    res: Response
  ) => {
    const item = await Resource.create({
      ...req.body,
      userId: req.userId,
    });

    res.status(201).json(item);
  }
);

resourceRouter.patch(
  "/:id",
  async (
    req: Request<IdParam, unknown, Partial<NewResourceBody>>,
    res: Response
  ) => {
    const item = await Resource.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404).json({ message: "No item with that id" });
      return;
    }

    res.json(item);
  }
);

resourceRouter.delete(
  "/:id",
  async (req: Request<IdParam>, res: Response) => {
    const item = await Resource.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!item) {
      res.status(404).json({ message: "No item with that id" });
      return;
    }

    res.status(204).send();
  }
);