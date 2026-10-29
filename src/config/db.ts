import mongoose from "mongoose";

let connection: Promise<typeof mongoose> | null = null;

export function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return Promise.reject(new Error("MONGODB_URI is missing."));
  }

  if (connection === null) {
    connection = mongoose
      .connect(uri, {
        family: 4,
        serverSelectionTimeoutMS: 5000,
      })
      .then((connected) => {
        console.log(`MongoDB connected: ${connected.connection.host}`);
        return connected;
      })
      .catch((error: unknown) => {
        connection = null;
        throw error;
      });
  }

  return connection;
}