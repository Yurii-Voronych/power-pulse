import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
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

    recommended: {
      type: Boolean,
      default: true,
      index: true,
    },

    groupBloodNotAllowed: {
      1: { type: Boolean, default: false },
      2: { type: Boolean, default: false },
      3: { type: Boolean, default: false },
      4: { type: Boolean, default: false },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Product = models.Product || model("Product", productSchema);

export default Product;
