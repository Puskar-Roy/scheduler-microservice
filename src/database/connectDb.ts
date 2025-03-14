import mongoose from "mongoose";
import config from "../config/config";


const connectDB = async () => {
  try {
    const DB_URI: string = config.DATA_BASE!;
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); 
  }
};

export default connectDB;