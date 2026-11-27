# Peshawar Flash Fiber

A responsive customer-facing website for PTCL Flash Fiber and broadband services in Peshawar.

## Live website

- **Vercel:** https://peshawarnetwork.vercel.app/
- **GitHub Pages:** https://atifakhan.github.io/peshawarnetwork/

## Features

- Responsive navigation for desktop and mobile
- PTCL Flash Fiber package cards with category filters
- Optional QuadPlay / Smart TV bundle selection
- Peshawar coverage areas and booking flow
- WhatsApp and call-to-action links
- Light and dark themes
- Interactive 3D fiber-network showcase with a static fallback for browsers that cannot initialize WebGL

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- Three.js
- Motion
- Lucide icons

## Run locally

Requirements: Bun.

```bash
bun install
bun run dev
```

Create a production build:

```bash
bun run build
bun run preview
```

## Deployment

- Vercel builds the Vite project from the repository root with the default base path.
- GitHub Pages uses the workflow at `.github/workflows/static.yml` and builds with the `/peshawarnetwork/` base path.

For GitHub Pages, the repository's **Settings → Pages → Build and deployment → Source** should be set to **GitHub Actions**.

## Contact

For service enquiries and bookings, use the contact options shown on the live website.
