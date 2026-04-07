import { Schema, model, models } from "mongoose";

const ExerciseSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    target: {
      type: String,
    },
    burnedCalories: {
      type: String,
    },
    time: {
      type: String,
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
