import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import connectDB from "./utils/MDB.connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/auth.middleware.js";
dotenv.config();


const __dirname = path.resolve();
const PORT = process.env.PORT || 5003;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "https://chat-app-1-sepia.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  // your frontend domain
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.get("/api/auth/me", protectRoute, (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ user: req.user });
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});
app.listen(PORT, () => {

  connectDB();
});
