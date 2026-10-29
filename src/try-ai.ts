import "dotenv/config";
import { reviewProject } from "./ai/gemini";

async function tryAi() {
  const review = await reviewProject(
    "A campus lost-and-found app built with React and TypeScript. Students register, search found items by category, and file claims. The Express API uses MongoDB, and both apps are deployed."
  );
  console.log(JSON.stringify(review, null, 2));
}

void tryAi().catch((error: unknown) => {
  console.error("Gemini call failed:", error);
  process.exit(1);
});
