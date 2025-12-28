"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkout = exports.createWorkout = void 0;
const workout_model_1 = __importDefault(require("../models/workout.model"));
const createWorkout = async (req, res) => {
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
    const workout = await workout_model_1.default.create({
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
exports.createWorkout = createWorkout;
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, duration, date, notes } = req.body;
    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    const workout = await workout_model_1.default.findById(id);
    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    // Check if user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: "User not authorized" });
      return;
    }
    const updatedWorkout = await workout_model_1.default.findByIdAndUpdate(
      id,
      {
        type,
        duration,
        date,
        notes,
      },
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.updateWorkout = updateWorkout;
