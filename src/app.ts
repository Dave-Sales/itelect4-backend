import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { aiRouter } from "./routes/ai";
import { authRouter } from "./routes/auth";
import { categoryRouter } from "./routes/categories";
import { claimRouter } from "./routes/claims";
import { itemRouter } from "./routes/items";
import { resourceRouter } from "./routes/resources";
import { userRouter } from "./routes/users";

export const app = express();

const allowedOrigins = (
  process.env.CORS_ORIGIN ??
  (process.env.NODE_ENV === "production"
    ? "https://itelect4-project-black.vercel.app"
    : "http://localhost:5173")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  await connectDB();
  next();
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/claims", claimRouter);
app.use("/api/resources", resourceRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `No route for ${req.method} ${req.originalUrl}`,
  });
});

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        message: "Validation failed",
        errors: Object.values(err.errors).map((e) => e.message),
      });
      return;
    }

    if (err instanceof mongoose.Error.CastError) {
      res.status(400).json({
        message: `"${err.value}" is not a valid id`,
      });
      return;
    }

    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
);

export default app;