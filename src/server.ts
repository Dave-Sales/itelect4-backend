import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;
const isDev = process.env.npm_lifecycle_event === "dev";

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    if (!isDev) {
      process.exit(1);
    }
    console.warn("Starting dev server without a database connection.");
  }

  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
};

void startServer();