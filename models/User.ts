import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    profile: {
      height: {
        type: Number,
        min: 150,
      },

      currentWeight: {
        type: Number,
        min: 35,
      },

      desiredWeight: {
        type: Number,
        min: 35,
      },

      birthday: {
        type: Date,
      },

      blood: {
        type: Number,
        enum: [1, 2, 3, 4],
      },

      sex: {
        type: String,
        enum: ["male", "female"],
      },

      levelActivity: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
      },
    },

    dailyNorm: {
      calories: {
        type: Number,
        min: 0,
      },

      sportMinutes: {
        type: Number,
        default: 110,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = models.User || model("User", userSchema);

export default User;
