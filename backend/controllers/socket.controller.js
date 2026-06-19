import { Server } from "socket.io";
import { Message } from "../models/Msgs.model.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("new client connected:", socket.id);

    // Join user-specific room using their MongoDB ID
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(` User joined room: ${userId}`);
    });

    // Handle message sending
    socket.on("sendMessage", async (data) => {
      const { senderId, senderType, recipientId, recipientType, content } = data;

      try {
        const newMessage = await Message.create({
          sender: senderId,
          senderType,
          recipient: recipientId,
          recipientType,
          content
        });

        // Emit to recipient
        io.to(recipientId).emit("receiveMessage", newMessage);
      } catch (err) {
        console.error(" Error saving message:", err.message);
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};