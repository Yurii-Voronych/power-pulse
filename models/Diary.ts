import { Schema, model, models } from "mongoose";

const DiaryProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    recommended: {
      type: Boolean,
      required: true,
    },
  },
  { _id: true },
);

const DiaryExerciseSchema = new Schema(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },

    bodyPart: {
      type: String,
      required: true,
    },

    equipment: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      required: true,
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
  },
  { _id: true },
);

const DiarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },

    products: {
      type: [DiaryProductSchema],
      default: [],
    },

    exercises: {
      type: [DiaryExerciseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DiarySchema.index({ userId: 1, date: 1 }, { unique: true });

const Diary = models.Diary || model("Diary", DiarySchema);

export default Diary;
