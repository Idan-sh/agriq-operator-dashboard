# agriQ Operator Dashboard

**Task 2 - Operator Dashboard** (agriQ full-stack take-home): a React frontend that uses **mock data only** (no backend). It shows storage sites, piles, sensor readings, and alerts.

<img width="1363" height="938" alt="Site Intro screenshot" src="https://github.com/user-attachments/assets/4363d402-0d29-4085-a6a0-5d58b943366b" />

## Prerequisites

- **Node.js** 20 or later - [nodejs.org](https://nodejs.org/)
- **npm** (ships with Node)

## Install and run

```bash
npm install
npm run dev
```

Then open the URL from the terminal (usually **http://localhost:5173**). Use **Sites** and **Alerts** in the header. Use the **Theme** control (Light / Dark / System) to match your preference; the choice is saved in the browser.

If `npm install` hits permission errors on the global npm cache:

```bash
npm install --cache ./.npm-cache
```

## Screenshots

### Sites details:   
<img width="1363" height="938" alt="Sites details page screenshot" src="https://github.com/user-attachments/assets/424e1ead-532a-4c42-b791-4f3eed47604e" />

### Alerts Table:   
<img width="1363" height="938" alt="Alerts table page screenshot" src="https://github.com/user-attachments/assets/41cc9bf3-64d0-44ef-be83-e8e2be7a1531" />

### Filter Alerts:   
<img width="1363" height="938" alt="Filter alerts section screenshot" src="https://github.com/user-attachments/assets/de8eee48-8714-41da-94cb-8cbfa454e707" />


## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server (Vite) |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, react-router-dom. Styling uses semantic tokens and `dark:` mode (class on `html`) with light, dark, and system options.
