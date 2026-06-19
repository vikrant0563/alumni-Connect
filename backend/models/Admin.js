import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@mpgi\.edu\.in$/.test(email);
        },
        message: "Email must belong to the domain mpgi.edu.in",
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    permissions: {
      type: [String],
      default: ["manage-alumni", "view-donations", "organize-events"],
    },
    failedAttempts: {
      type: Number,
      default: 0,
    },
    accountStatus: {
      type: String,
      default: "active",
      enum: ["active", "suspended", "disabled"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("Admin", adminSchema);
