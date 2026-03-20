import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient(); 
const app = express();

app.use(cors({
  origin: "http://localhost:5173" 
}));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
  
    await prisma.task.deleteMany({ where: { userId: Number(id) } });

  
    await prisma.user.delete({ where: { id: Number(id) } });

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

app.get("/users", async (_req, res) => res.json(await prisma.user.findMany()));

app.listen(3000, () => console.log("API running on http://localhost:3000"));