# zaiika.com

The public "coming soon" page for Zaiika, built with Vite, React, Tailwind and shadcn/ui.

| Task | Command |
|---|---|
| Install | `npm ci` (Node 24, see `.nvmrc`) |
| Run locally | `npm run dev` |
| Build | `npm run build` |

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). `public/CNAME` serves it on `zaiika.com`.

Only public content belongs in this repository. Product code and plans live in private repositories.
