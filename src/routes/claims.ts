import { Router, type Request } from "express";
import { requireAuth } from "../middleware/auth";
import { Claim } from "../models/Claim";
import { Item } from "../models/Item";
import { User } from "../models/User";

interface NewClaimBody {
  itemId: string;
  claimedByUserId: string;
  notes?: string;
}

export const claimRouter = Router();

claimRouter.use(requireAuth);

claimRouter.get("/", async (_req, res) => {
  const claims = await Claim.find().sort({ claimedAt: -1 });
  res.json(claims);
});

claimRouter.post(
  "/",
  async (req: Request<unknown, unknown, NewClaimBody>, res) => {
    const { itemId, claimedByUserId, notes } = req.body;

    const [item, user] = await Promise.all([
      Item.findById(itemId),
      User.findById(claimedByUserId),
    ]);

    if (!item || !user) {
      res.status(404).json({ message: "Item or user not found." });
      return;
    }

    const claim = await Claim.create({ itemId, claimedByUserId, notes });
    res.status(201).json(claim);
  }
);
