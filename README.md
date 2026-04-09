# ticktock — Frontend

Next.js 14 + TypeScript Timesheet Management App.  
**No backend required** — all data lives in-memory using mock data.

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Create env file
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

Open http://localhost:3000

### Login
| Field    | Value                  |
|----------|------------------------|
| Email    | `john@example.com`     |
| Password | `password123`          |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (Pages Router) | Framework |
| TypeScript | Type safety |
| next-auth v4 | Auth with JWT session |
| Formik + Yup | Form handling & validation |
| TailwindCSS | Styling |
| react-hot-toast | Toast notifications |
| date-fns | Date formatting |
| lucide-react | Icons |
| axios | HTTP (internal API calls) |
| Jest + Testing Library | Unit tests |

---

## Project Structure

```
src/
├── __tests__/               # Unit tests
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── timesheets/
│   │   ├── EntryFormModal.tsx      # Add/Edit entry (Formik+Yup)
│   │   ├── TimesheetDetailModal.tsx # Week detail view
│   │   ├── TimesheetFilters.tsx
│   │   └── TimesheetTable.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Pagination.tsx
│       └── StatusBadge.tsx
├── data/
│   └── mockDb.ts            # All dummy data (users + 10 weeks)
├── hooks/
│   └── useTimesheets.ts     # State + API calls
├── lib/
│   ├── dateUtils.ts
│   └── validationSchemas.ts
├── pages/
│   ├── api/
│   │   ├── auth/[...nextauth].ts
│   │   └── timesheets/      # Internal API proxy routes
│   ├── _app.tsx
│   ├── index.tsx            # Redirect
│   ├── login.tsx
│   └── dashboard.tsx
├── services/
│   └── mockTimesheetService.ts  # In-memory CRUD
├── styles/globals.css
└── types/index.ts
```

---

## Architecture

```
Browser → Next.js Internal API Route (/api/timesheets)
              ↓
        mockTimesheetService  (in-memory store)
              ↓
        mockDb.ts seed data
```

All client-side calls go through internal `/api/...` routes. The browser never calls mock functions directly — keeping the same pattern as a real backend integration.

---

## Authentication

- next-auth `CredentialsProvider` validates against `MOCK_USERS` in `mockDb.ts`
- Session stored as JWT (httpOnly cookie)
- Protected pages use `getServerSideProps` + `getServerSession`

---

## Status Logic

| Status | Condition |
|---|---|
| `completed` | ≥ 40 hrs logged |
| `incomplete` | > 0 but < 40 hrs |
| `missing` | No entries |

---

## Run Tests

```bash
npm test
```

---

## Assumptions & Notes

- No backend required; all data is seeded from `src/data/mockDb.ts`
- The in-memory store resets on server restart (expected for a mock)
- To connect a real backend later, replace `mockTimesheetService.ts` calls with real `fetch`/axios calls — the internal API route structure stays the same
- Time spent: ~5–6 hours
