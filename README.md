# 💡 IdeaDrop Frontend

> **Frontend for the IdeaDrop Project** — A platform to share, explore, and build on the best startup ideas and side hustles.

Built with **TanStack Start**, **React**, **TypeScript**, and **Tailwind CSS**. Deployed live on **Vercel**.

🔗 **Live Site:** [idea-drop-frontend-orcin.vercel.app](https://idea-drop-frontend-orcin.vercel.app)
🔗 **Backend Repo:** [idea-drop-api](https://github.com/leonistheczar/idea-drop-api)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Routing](#routing)
  - [File-Based Routing](#file-based-routing)
  - [Layouts](#layouts)
  - [Data Loading](#data-loading)
- [Styling](#styling)
- [Server Functions](#server-functions)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

---

## Overview

IdeaDrop Frontend is a full-stack-capable React application powered by TanStack Start. It connects to the [IdeaDrop API](https://github.com/leonistheczar/idea-drop-api) to provide:

- **Public idea browsing** — view all submitted startup ideas and side hustles
- **Idea detail pages** — read the full description of any idea
- **User authentication** — register, login, and logout
- **Protected idea management** — authenticated users can create, edit, and delete their own ideas
- **SSR-ready architecture** — TanStack Start handles server-side rendering and server functions
- **Type-safe routing** — TanStack Router with full TypeScript support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR React framework) |
| Language | TypeScript |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Testing | Vitest |
| HTTP Client | Axios / Fetch (via server functions) |
| Deployment | Vercel |

---

## Project Structure

```
idea-drop-frontend/
├── public/
│   └── main-logo.svg           # App logo asset
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # Root layout (shell, nav, head)
│   │   ├── index.tsx           # Home page — latest ideas
│   │   ├── ideas/
│   │   │   ├── index.tsx       # Browse all ideas
│   │   │   ├── $ideaId.tsx     # Single idea detail page
│   │   │   └── $ideaId.edit.tsx# Edit idea (protected)
│   │   ├── login.tsx           # Login page
│   │   ├── register.tsx        # Register page
│   ├── components/             # Reusable UI components
│   ├── styles.css              # Global styles + Tailwind import
│   └── main.tsx                # App entry point
├── .cta.json                   # TanStack Start project config
├── .gitignore
├── package.json
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind plugin config
├── vercel.json                 # Vercel deployment configuration
└── README.md
```

---

## Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | Home | Public | Landing page with latest ideas |
| `/ideas` | Browse Ideas | Public | Full list of all submitted ideas |
| `/ideas/:ideaId` | Idea Detail | Public | Full view of a single idea |
| `/ideas/new` | New Idea | Protected | Form to submit a new idea |
| `/ideas/:ideaId/edit` | Edit Idea | Protected | Form to update an existing idea |
| `/login` | Login | Public | User login form |
| `/register` | Register | Public | New user registration form |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- The [IdeaDrop API](https://github.com/leonistheczar/idea-drop-api) running locally or deployed

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/leonistheczar/idea-drop-frontend.git

# 2. Navigate into the project directory
cd idea-drop-frontend

# 3. Install dependencies
npm install
```

---

### Environment Variables

Create a `.env` file in the root of the project (`.gitignore` already excludes it):

```env
# API base URL — point to your local or deployed backend
VITE_API_URL=http://localhost:5000/api
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the IdeaDrop REST API |

> **Note:** All Vite environment variables must be prefixed with `VITE_` to be accessible in client-side code.

---

### Running the App

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000` (or whichever port Vite assigns).

---

## Building for Production

```bash
npm run build
```

This compiles TypeScript, bundles the app with Vite, and outputs production-ready files. TanStack Start handles SSR output automatically.

To preview the production build locally:

```bash
npm run start
```

---

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and integration testing.

```bash
# Run all tests
npm run test
```

Test files live alongside their source files or in a `__tests__/` directory and follow the `*.test.ts` / `*.spec.ts` naming convention.

---

## Routing

### File-Based Routing

TanStack Router uses **file-based routing** — every file in `src/routes/` automatically becomes a route. No manual route configuration is required.

```
src/routes/index.tsx         →  /
src/routes/ideas/index.tsx   →  /ideas
src/routes/ideas/$ideaId.tsx →  /ideas/:ideaId
src/routes/login.tsx         →  /login
```

Dynamic segments use the `$` prefix (e.g., `$ideaId`).

### Adding a New Route

Simply create a new file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About IdeaDrop</div>
}
```

TanStack Router will automatically detect and register the route.

### Navigating Between Pages

Use the `Link` component for client-side SPA navigation:

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/ideas">Browse Ideas</Link>
<Link to="/ideas/$ideaId" params={{ ideaId: idea._id }}>View Idea</Link>
```

### Layouts

The root layout lives in `src/routes/__root.tsx`. It wraps every page and contains the navigation bar, head metadata, and global shell:

```tsx
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'IdeaDrop — Your Idea World' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        <nav>...</nav>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

### Data Loading

Route loaders fetch data before the component renders, enabling SSR and preventing loading flashes:

```tsx
export const Route = createFileRoute('/ideas')({
  loader: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/ideas`)
    return res.json()
  },
  component: IdeasPage,
})

function IdeasPage() {
  const ideas = Route.useLoaderData()
  return (
    <ul>
      {ideas.map(idea => <li key={idea._id}>{idea.title}</li>)}
    </ul>
  )
}
```

---

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) via the `@tailwindcss/vite` plugin (no separate `tailwind.config.js` required in modern setups).

Tailwind is imported in `src/styles.css`:

```css
@import "tailwindcss";
```

### Removing Tailwind

If you prefer to use custom CSS instead:

1. Delete the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall: `npm uninstall @tailwindcss/vite tailwindcss`

---

## Deployment

The frontend is deployed on **[Vercel](https://vercel.com)** with automatic deployments on every push to `main`.

**Live URL:** [https://idea-drop-frontend-orcin.vercel.app](https://idea-drop-frontend-orcin.vercel.app)

### Deploying Your Own Instance

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Set the **Environment Variable** `VITE_API_URL` to your deployed backend URL.
4. Click **Deploy**.

Vercel will auto-detect the Vite/TanStack Start setup and configure the build accordingly.

---

## Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run start    # Preview production build locally
npm run test     # Run Vitest test suite
```

---

## Dependencies

> Full dependency list is in `package.json`. Key packages include:

| Package | Purpose |
|---|---|
| `@tanstack/react-start` | SSR React framework |
| `@tanstack/react-router` | File-based, type-safe routing |
| `react` / `react-dom` | UI library |
| `typescript` | Static type checking |
| `vite` | Lightning-fast build tool |
| `@tailwindcss/vite` | Tailwind CSS via Vite plugin |
| `tailwindcss` | Utility-first CSS framework |
| `vitest` | Fast unit testing framework |

---

## Author

**Muhammad Ali**
- GitHub: [@leonistheczar](https://github.com/leonistheczar)

---

## License

This project is licensed under the **MIT License**.

---

> 💡 *Drop your ideas. Build the future.*
