import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import { fileURLToPath } from 'url';
import Alumni from "./routes/Alumni.js";
import User from "./routes/User.routes.js";
import donationRoutes from "./routes/donationRoutes.js";
import job from './routes/job.routes.js'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import { initSocket } from "./controllers/socket.controller.js";
import { createServer } from "http";
 dotenv.config({
    path: './config/.env'
})

// Configure dotenv
dotenv.config();

// Initialize the app
const app = express();
const server = createServer(app);
initSocket(server);

// Middleware for JSON data
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.static("public"))
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error: ", error));

// Routes Middleware
app.get("/", (req, res) => {
    res.send("Welcome to the Alumni Platform"); // Serve a proper response or a webpage
  });


app.use("/alumni", Alumni);
app.use("/student",User);
app.use("/donation", donationRoutes);
app.use("/jobs",job)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
