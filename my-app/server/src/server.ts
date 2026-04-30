import express from "express";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

export const prisma = new PrismaClient(); 
const app = express();


app.use(cors({
  origin: "http://localhost:5173" 
}));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/users", userRouter);

app.listen(3000, () => console.log("API running on http://localhost:3000"));