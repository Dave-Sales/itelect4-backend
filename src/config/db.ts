import mongoose from "mongoose";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI || "", {
    family: 4,
    serverSelectionTimeoutMS: 5000,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
};