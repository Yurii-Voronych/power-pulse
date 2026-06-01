import { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema(
  {
    bodyPart: {
      type: String,
      required: true,
      trim: true,
    },
    equipment: {
      type: String,
      required: true,
      trim: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    target: {
      type: String,
      required: true,
      trim: true,
    },
    burnedCalories: {
      type: Number,
      required: true,
      min: 0,
    },
    time: {
      type: Number,
      required: true,
      min: 0,
    },
    met: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Exercise =
  models.Exercise || model("Exercise", ExerciseSchema, "exercises");

export default Exercise;
