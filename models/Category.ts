import { Schema, model, models } from "mongoose";

const productsCategoriesSchema = new Schema(
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

const Category =
  models.Category ||
  model("Category", productsCategoriesSchema, "productsCategories");

export default Category;
