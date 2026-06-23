import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import deleteExpiredTasks from "./cron/deleteExpiredTasks.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(3000, () => {
  console.log("🚀 Server Running On Port 3000");
  deleteExpiredTasks();
});
