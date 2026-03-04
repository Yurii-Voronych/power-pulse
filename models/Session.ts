import { Schema, model, models } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    refreshTokenHash: {
      type: String,
      required: true,
    },

    userAgent: {
      type: String,
      maxlength: 500,
    },

    ip: {
      type: String,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
SessionSchema.index({ userId: 1 });
SessionSchema.index({ refreshTokenHash: 1 });

export default models.Session || model("Session", SessionSchema);
