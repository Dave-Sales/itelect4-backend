import { model, Schema } from "mongoose";
import type { ClaimDoc } from "../types";

const claimSchema = new Schema<ClaimDoc>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    claimedByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    claimedAt: { type: Date, default: Date.now },
    notes: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true }
);

claimSchema.set("toJSON", {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id);
    ret.itemId = String(ret.itemId);
    ret.claimedByUserId = String(ret.claimedByUserId);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Claim = model<ClaimDoc>("Claim", claimSchema);
