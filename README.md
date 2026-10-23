# Campus Lost & Found API

## Local development

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to the Atlas connection string and `JWT_SECRET` to a private, strong signing secret.
3. Run `npm install` and `npm run dev`.
4. Run `npm run seed` once to populate the public item categories.

`CORS_ORIGIN` accepts a comma-separated list of exact browser origins. The local development default is `http://localhost:5173`.

## Vercel

Import this repository with its root directory set to the backend repository root. Vercel serves the default Express export from `src/app.ts`; no `PORT` setting is needed. Set `MONGODB_URI`, `JWT_SECRET`, and `CORS_ORIGIN` in the Vercel project's Production environment, then deploy. After deployment, run `npm run seed` against the configured Atlas database and verify `/api/health` returns `{"ok":true,"db":true}`.

After the frontend has a Vercel URL, set that exact origin as `CORS_ORIGIN` and redeploy the backend. Keep secrets in the hosting provider's environment settings, not in Git.

Atlas's `0.0.0.0/0` access-list entry allows connections from every public IP. Use a dedicated database user with a strong password and only the permissions this app needs; remove the broad entry when a suitable restricted network path is available.
