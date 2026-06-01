import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./utils/errorHandler.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get("/health", (_req, res) =>
  res.json({ status: "ok" })
);

app.use("/users", userRouter);

app.use("/tasks", taskRouter);

app.use(errorHandler);

export default app;