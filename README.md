# agriQ Operator Dashboard

Frontend for the agriQ take-home assignment **Task 2 — Operator Dashboard**: a React app that will show storage sites, piles, sensor readings, and alerts using mock data (no backend).

## Prerequisites

- **Node.js** 20 or newer ([download](https://nodejs.org/))
- **npm** (bundled with Node)

## Setup

From this project directory:

```bash
npm install
```

If `npm install` fails with permission errors on your global npm cache, use a local cache:

```bash
npm install --cache ./.npm-cache
```

## Run locally

Start the development server:

```bash
npm run dev
```

Open the URL printed in the terminal (typically **http://localhost:5173**). Use the navigation links for **Sites** and **Alerts**.

## Other scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run build` | Production build to `dist/`   |
| `npm run preview` | Preview the production build locally |
| `npm run lint`  | Run ESLint                     |

## Tech stack

- React 19, TypeScript, Vite, react-router-dom

## Git

The repository metadata lives in **`.repo`** (a separate Git directory). If plain `git` commands fail in this folder (for example on a machine that locks the `.git` pointer file), use:

```bash
git --git-dir=.repo --work-tree=. status
git --git-dir=.repo --work-tree=. log
```

To use normal `git` commands, point the worktree’s `.git` file at `.repo`:

```bash
echo "gitdir: $(pwd)/.repo" > .git
```

After you **clone** this project from GitHub, you will have a standard `.git` directory and do not need `.repo` or the commands above.
