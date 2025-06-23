// models/userModel.js
import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  userType: {
    type: String,
    enum: ["client", "admin", "vendor", "driver"],
    default: "client",
    required: [true, "User type is required"],
  },
  profile: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
}, { timestamps: true });

// ✅ Export default
const userModel = mongoose.model("User", userSchema);
export default userModel;
