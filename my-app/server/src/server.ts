import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 
const app = express();

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

app.get("/users", async (_req, res) => res.json(await prisma.user.findMany()));

app.listen(3000, () => console.log("API running on http://localhost:3000"));
