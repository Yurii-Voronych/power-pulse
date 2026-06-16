import { Schema, model, models } from "mongoose";

const exerciseFilterSchema = new Schema(
  {
    filter: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imgURL: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Filter =
  models.Filter || model("Filter", exerciseFilterSchema, "filters");

export default Filter;
