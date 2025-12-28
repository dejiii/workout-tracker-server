import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Workout from "../models/workout.model";

export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { type, duration, date, notes } = req.body;

    if (!type || !duration || !date) {
      res.status(400).json({ message: "Please fill in all required fields" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const workout = await Workout.create({
      user: req.user._id,
      type,
      duration,
      date,
      notes,
    });

    res.status(201).json({
      id: workout._id,
      type: workout.type,
      duration: workout.duration,
      date: workout.date,
      notes: workout.notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { type, duration, date, notes } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      {
        type,
        duration,
        date,
        notes,
      },
      { new: true }
    );

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await Workout.countDocuments({ user: req.user._id });

    const workouts = await Workout.find({ user: req.user._id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      workouts,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalWorkouts: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }

    if (workout.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    await workout.deleteOne();

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
