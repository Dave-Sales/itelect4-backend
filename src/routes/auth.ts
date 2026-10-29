import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import type { TokenPayload } from "../middleware/auth";

export const authRouter = Router();

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing.");
  }
  return secret;
}

authRouter.post(
  "/register",
  async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response
  ) => {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();
    const secret = jwtSecret();

    if (await User.findOne({ email: normalizedEmail })) {
      res.status(409).json({
        message: "That email is already registered",
      });
      return;
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });
    const payload: TokenPayload = { userId: String(user._id) };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });

    res.status(201).json({ token, user: user.toJSON() });
  }
);

authRouter.post(
  "/login",
  async (
    req: Request<unknown, unknown, LoginBody>,
    res: Response
  ) => {
    const { email, password } = req.body;
    const secret = jwtSecret();

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select(
      "+password"
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        message: "Email or password is incorrect",
      });
      return;
    }

    const payload: TokenPayload = { userId: String(user._id) };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" });

    res.json({ token, user: user.toJSON() });
  }
);