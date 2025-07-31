import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import userRoutes from "./routes/user.routes.js";
import beauticianRoutes from "./routes/beautician.routes.js";
import locationRoutes from "./routes/location.routes.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";

dotenv.config();
const app = express();

// --- START: Updated CORS Configuration ---
const corsOptions = {
  origin: "https://we-caree.vercel.app", // Your frontend's origin
  methods: ["GET","POST","PUT","DELETE"], // Allowed HTTP methods
  credentials: true, // IMPORTANT: Allow cookies to be sent
};

app.use(cors(corsOptions));
// Handle pre-flight requests for all routes


app.use(express.json());
app.use(cookieParser());

// // API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/beautician", beauticianRoutes);
app.use("/api/admin-auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/locations", locationRoutes);

// // Database Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.error("❌ Failed to connect to MongoDB", err));
