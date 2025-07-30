import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
 
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: String,
  location: String,
  referralCode: String,
  address: String,
  profileImage: String,
  isVerified: {
    type: Boolean,
    default: true // because we're not using OTP anymore
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
