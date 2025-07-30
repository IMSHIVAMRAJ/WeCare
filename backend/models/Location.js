import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

// 💡 This line checks if the model exists and only creates it if it doesn't.
export default mongoose.models.Location || mongoose.model("Location", locationSchema);