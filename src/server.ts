import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;

void connectDB().catch((error: unknown) => {
  console.error("Could not connect to MongoDB:", error);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});