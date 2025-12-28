import mongoose, { Document, Schema } from "mongoose";

export interface IWorkout extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Please add a workout type"],
    },
    duration: {
      type: Number,
      required: [true, "Please add a duration"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWorkout>("Workout", WorkoutSchema);
