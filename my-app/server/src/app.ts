import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/health", (_req, res) =>
  res.json({ status: "ok" })
);

app.use("/users", userRouter);

export default app;