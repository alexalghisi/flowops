# FlowOps

Personal portfolio project / technical case study.

Multi-tenant operations board: projects, persisted column moves, activity, and CSV export.

It is **not** a hosted commercial product. Seed data is fictional. This repository
does not claim customers, revenue, or production traffic.

**Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · PGlite (embedded Postgres) · Zod · Vitest**

---

## Author

### Alessandro Alghisi

Senior Software Engineer · Cluj-Napoca, Romania

**Twice a Google Software Engineering Intern** — Chrome (Kitchener / Waterloo)
and Logs (Mountain View).

|          |                                                                    |
| -------- | ------------------------------------------------------------------ |
| GitHub   | [github.com/alexalghisi](https://github.com/alexalghisi)       |
| LinkedIn | [linkedin.com/in/alghisi](https://www.linkedin.com/in/alghisi)                      |
| Email    | [alexalghisi@gmail.com](mailto:alexalghisi@gmail.com)                          |
| Location | Cluj-Napoca, Romania · open to remote / EU / US-friendly timezones |

**Hiring?** Open an issue, message me on LinkedIn, or email
[alexalghisi@gmail.com](mailto:alexalghisi@gmail.com).


---

## Why this exists

Ops teams need a board that remembers who moved what — not a screenshot of sticky notes.

---

## Implemented

- Email/password session (HttpOnly cookie)
- Organization membership and role (owner / member / viewer)
- Projects and tasks on a four-column board
- Persisted column moves with an activity row
- Viewer cannot move tasks (enforced in the server action)
- CSV export of the open project
- Seeded Harborline Operations desk

## Planned (not built)

- Invitations
- Approval workflows
- Simulated billing

## Out of scope

- Real payments
- Claiming production customers

---

## Architecture

One Next.js process: App Router pages, server actions, and (where needed) route
handlers. The database is **PGlite** in `.data/pglite` — real PostgreSQL SQL
without Docker. Set `DATABASE_URL` only if you point this schema at a hosted
Postgres yourself; this MVP does not ship a Compose file because this machine
cannot verify Docker.

`organization_id` always comes from the session (or the ingest key on
SentinelHub). The client never chooses the tenant.

```
Browser  →  Next.js (server actions)
                ↓
         PGlite  (.data/pglite)
```

---

## Local map

Dev server: [http://localhost:3001](http://localhost:3001)

| Surface | Path | What you should see |
| ------- | ---- | ------------------- |
| Landing | `/` | Product pitch and case-study disclaimer |
| Log in | `/login` | Demo credentials; failed login shows an error |
| Dashboard | `/app` | Project list and counts |
| Board | `/app/board` | Four columns; move is a POST |
| Activity | `/app/activity` | Who moved which card |

Buttons use the same rounded `Button` (`rounded-md`) as the rest of the
portfolio. Failed login uses `text-sm text-destructive`.

---

## Setup

Requires Node 22+.

```bash
git clone https://github.com/alexalghisi/flowops.git
cd flowops
cp .env.example .env.local
npm install
npm run seed
npm run dev
```

### Demo account (fictional)

|          |                 |
| -------- | --------------- |
| Email    | `demo@flowops.dev`  |
| Password | `DemoPass123!` |
| Org      | Harborline Operations        |

Reseed by deleting `.data/pglite` and running `npm run seed` again.

---

## Scripts

```bash
npm run dev          # http://localhost:3001
npm run test         # domain rules (Vitest)
npm run typecheck
npm run lint
npm run build
npm run seed
```

CI runs typecheck, unit tests, lint, and production build on Node 22.

---

## Security notes

- Passwords are bcrypt (12 rounds).
- Session tokens are stored hashed; the cookie is HttpOnly / SameSite=lax.
- Mutating actions re-check the membership role on the server.
- `.env*` and `.data/` are gitignored.

---

## License

MIT · © Alessandro Alghisi
