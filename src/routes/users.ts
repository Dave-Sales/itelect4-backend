import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { User } from "../models/User";

export const userRouter = Router();

userRouter.use(requireAuth);

userRouter.get("/", async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

userRouter.get("/me", async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.json(user);
});
