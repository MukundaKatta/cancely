# Cancely

> Cancel every subscription you forgot.

Connect your card. See the 23 things you're paying for. Cancel any in one tap. Keep what you love.

## Stack

- **Next.js 15.3.1** — App Router, TypeScript strict
- **Tailwind v4** — `@tailwindcss/postcss`, CSS-first config (no `tailwind.config` file)
- **`next/font/google`** — Inter (replaces CDN link)
- **pnpm** lockfile committed

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Zero Vercel config changes required — Next.js is auto-detected.
No environment variables needed (waitlist API URL is public and hardcoded).

```bash
pnpm build   # 5 static routes + 1 dynamic (/api/waitlist)
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, CTA, footer |
| `/try` | Subscription dashboard: 6 mock cards, cancel/undo toggle, running total, localStorage persistence |
| `/api/waitlist` | POST `{ email }` — forwards to waitlist-api-sigma with `product: "cancely"` |

## Status

v0 skeleton. No real bank connection, no component libraries, no lorem ipsum, no feature invention beyond landing claims.
