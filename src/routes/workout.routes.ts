import express from "express";
import {
  createWorkout,
  updateWorkout,
  getWorkouts,
  deleteWorkout,
} from "../controllers/workout.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getWorkouts);
router.post("/", protect, createWorkout);
router.put("/:id", protect, updateWorkout);
router.delete("/:id", protect, deleteWorkout);

export default router;
