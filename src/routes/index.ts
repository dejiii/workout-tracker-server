import express from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import workoutRoutes from "./workout.routes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/workouts", workoutRoutes);

export default router;
