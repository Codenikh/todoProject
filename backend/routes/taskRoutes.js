import express from "express";

const router = express.Router();

import {
  addTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import verifyToken from "../middleware/verifyToken.js";

router.post("/add-task", verifyToken, addTask);

router.get("/tasks", verifyToken, getTasks);

router.get("/task/:id", verifyToken, getTask);

router.put("/update-task", verifyToken, updateTask);

router.delete("/delete-task/:id", verifyToken, deleteTask);

export default router;

// patch -> single data edit