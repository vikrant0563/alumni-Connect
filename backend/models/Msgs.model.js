import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderType"
    },
    senderType: {
      type: String,
      enum: ["User", "Alumni"],
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "recipientType"
    },
    recipientType: {
      type: String,
      enum: ["User", "Alumni"],
      required: true
    },
    content: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
