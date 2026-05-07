import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";


describe("health", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("users", () => {
    it("should return 200 and an array of users", async () => {
  const res = await request(app).get("/users");

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body.users)).toBe(true);
  expect(res.body.users).toEqual([]);
})});


describe("GET /users/:id", () => {
  it("should return 404 if user does not exist", async () => {
    const res = await request(app).get("/users/999999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      message: "User not found"
    });
  });
});
