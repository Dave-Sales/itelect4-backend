import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";

vi.mock("../src/config/db", () => ({
  connectDB: vi.fn().mockResolvedValue({}),
}));

vi.mock("../src/models/Item", () => ({
  Item: {
    find: vi.fn(() => ({
      sort: vi.fn().mockResolvedValue([]),
    })),
  },
}));

import { app } from "../src/app";

describe("protected items route", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
  });

  it("rejects requests without a bearer token", async () => {
    const response = await request(app).get("/api/items");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "No token. Send Authorization: Bearer <token>"
    );
  });

  it("allows a valid token past authentication", async () => {
    const token = jwt.sign({ userId: "user-123" }, "test-secret");

    const response = await request(app)
      .get("/api/items")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
