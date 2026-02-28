# Jeffrey Sardella — Portfolio

Bento grid portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS
**Contact Form:** Formspree (free tier)
**Hosting:** Cloudflare Pages

## Local Development

**Prerequisites:** Node.js 20+

```bash
cd client
npm install
npm run dev    # → http://localhost:5173
```

## Deployment

Deploys automatically to Cloudflare Pages on push to `main` (changes in `client/`).

See `.github/workflows/deploy-client.yml`. Required secrets/variables:

| Secret/Variable | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare Pages deployment |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier |
| `FORMSPREE_ID` (variable) | Formspree form ID for contact form |

## Contact Form Setup

1. Create a free form at [formspree.io](https://formspree.io)
2. Copy the form ID (e.g. `xyzgolda`)
3. Set it as `FORMSPREE_ID` variable in GitHub repo settings
