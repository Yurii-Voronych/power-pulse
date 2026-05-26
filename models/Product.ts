import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    caloriesPer100g: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Product = models.Product || model("Product", productSchema);

export default Product;
