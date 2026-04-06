import { Schema, model, models } from "mongoose";

const productsFilterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
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
  models.Filter || model("Filter", productsFilterSchema, "filters");

export default Filter;
