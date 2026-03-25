# agriQ Operator Dashboard

**Task 2 — Operator Dashboard** (agriQ full-stack take-home): a React frontend that uses **mock data only** (no backend). It shows storage sites, piles, sensor readings, and alerts.

## Prerequisites

- **Node.js** 20 or later — [nodejs.org](https://nodejs.org/)
- **npm** (ships with Node)

## Install and run

```bash
npm install
npm run dev
```

Then open the URL from the terminal (usually **http://localhost:5173**). Use **Sites** and **Alerts** in the header.

If `npm install` hits permission errors on the global npm cache:

```bash
npm install --cache ./.npm-cache
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server (Vite) |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |

## Stack

React 19, TypeScript, Vite, react-router-dom.
