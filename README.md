# Campus Lost & Found API

## Local development

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to the Atlas connection string, `JWT_SECRET` to a private, strong signing secret, and `GEMINI_API_KEY` to a key from Google AI Studio. Add the real Gemini key only to `.env`; never commit it.
3. Run `npm install` and `npm run dev`.
4. Run `npm run seed` once to populate the public item categories.

`CORS_ORIGIN` accepts a comma-separated list of exact browser origins. The local development default is `http://localhost:5173`.

Run `npm run try-ai` to make a direct Gemini review request without Express. The AI review API is `POST /api/ai`; it requires a bearer token and accepts a `prompt` between 20 and 2000 characters.

## Vercel

Import this repository with its root directory set to the backend repository root. Vercel routes requests through the explicit handler in `api/index.ts`; no `PORT` setting is needed. Set `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, and `GEMINI_API_KEY` in the Vercel project's environments, then deploy. After deployment, run `npm run seed` against the configured Atlas database and verify `/api/health` returns `{"ok":true,"db":true}`.

After the frontend has a Vercel URL, set that exact origin as `CORS_ORIGIN` and redeploy the backend. Keep secrets in the hosting provider's environment settings, not in Git.

Atlas's `0.0.0.0/0` access-list entry allows connections from every public IP. Use a dedicated database user with a strong password and only the permissions this app needs; remove the broad entry when a suitable restricted network path is available.
