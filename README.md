# ticktock

A clean, no-backend timesheet management app built with **Next.js 14** and **TypeScript**.  
All data lives in-memory — no database setup, no backend needed.

---

## Get Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo login:**

| Field    | Value              |
|----------|--------------------|
| Email    | john@example.com   |
| Password | password123        |

---

## What It Does

- **Dashboard** — view all your timesheets in a paginated, filterable table
- **Timesheet detail page** — see a full week broken down day by day
- **Add entries** — click "+ Add new task" under any day to log hours
- **Edit / Delete entries** — use the `⋯` menu on any entry row
- **Filters** — filter timesheets by status (completed / incomplete / missing), start date, and end date
- **Pagination** — configurable rows per page, navigate between pages
- **Status tracking** — each timesheet is automatically marked completed, incomplete, or missing based on logged hours

---

## Status Rules

| Status       | When                          |
|--------------|-------------------------------|
| `completed`  | 40 or more hours logged       |
| `incomplete` | At least 1 entry, but under 40 hrs |
| `missing`    | No entries at all             |

---

## Tech Stack

| Tool                  | Used For                        |
|-----------------------|---------------------------------|
| Next.js 14 (Pages Router) | Framework                   |
| TypeScript            | Type safety                     |
| next-auth v4          | Auth via JWT session             |
| Formik + Yup          | Form handling & validation      |
| TailwindCSS           | Styling                         |
| react-hot-toast       | Toast notifications             |
| date-fns              | Date formatting                 |
| lucide-react          | Icons                           |
| axios                 | Internal API calls              |
| Jest + Testing Library | Unit tests                     |

---

## Project Structure

```
src/
├── __tests__/                    # Unit tests (Button, StatusBadge, calcStatus, dateUtils)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky top nav with user dropdown + sign out
│   │   └── Footer.tsx            # Simple footer with copyright
│   ├── timesheets/
│   │   ├── EntryFormModal.tsx    # Add / Edit entry form (Formik + Yup)
│   │   ├── TimesheetDetailModal.tsx
│   │   ├── TimesheetFilters.tsx  # Status + date range filters
│   │   └── TimesheetTable.tsx    # Dashboard table with View / Update / Create actions
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Pagination.tsx        # Page controls + rows-per-page selector
│       └── StatusBadge.tsx
├── data/
│   └── mockDb.ts                 # Seed data — 1 user + 10 weeks of timesheets
├── hooks/
│   └── useTimesheets.ts          # All state + API calls (fetch, add, edit, delete, create)
├── lib/
│   ├── dateUtils.ts              # formatDateRange, formatDate, getTotalHours
│   └── validationSchemas.ts     # Yup schemas for login and entry forms
├── pages/
│   ├── api/
│   │   ├── auth/[...nextauth].ts
│   │   └── timesheets/
│   │       ├── index.ts                        # GET list, POST create
│   │       ├── [id].ts                         # GET single timesheet
│   │       └── [id]/entries/
│   │           ├── index.ts                    # POST add entry
│   │           └── [entryId].ts               # PUT update, DELETE remove
│   ├── _app.tsx
│   ├── index.tsx                 # Redirects to /dashboard
│   ├── login.tsx                 # Login page (Formik + next-auth signIn)
│   ├── dashboard.tsx             # Timesheet list page
│   └── timesheets/[id].tsx       # Timesheet detail — day-by-day view
├── services/
│   └── mockTimesheetService.ts   # In-memory CRUD store
├── styles/globals.css
└── types/index.ts                # Timesheet, TimesheetEntry, EntryFormValues, etc.
```

---

## How It Works

```
Browser
  └── Next.js Page (dashboard / timesheets/[id])
        └── axios → /api/timesheets (internal API routes)
                        └── mockTimesheetService (in-memory store)
                                └── mockDb.ts (seed data)
```

The browser always goes through internal API routes — never calling mock functions directly.  
This means swapping in a real backend later only requires changing the service layer.

---

## Authentication

- Uses `next-auth` with a `CredentialsProvider`
- Validates email + password against `MOCK_USERS` in `mockDb.ts`
- Session stored as a JWT in an httpOnly cookie
- All protected pages use `getServerSideProps` + `getServerSession` to redirect unauthenticated users

---

## Timesheet Detail Page

When you click **View** or **Update** on the dashboard, you're taken to `/timesheets/[id]`.

This page shows:
- The week's date range in the header
- A progress bar showing hours logged out of 40
- Each day of the week with its entries listed below it
- An **"+ Add new task"** button under every day
- A `⋯` context menu on each entry with **Edit** and **Delete** options

---

## API Routes

| Method | Route                                      | What it does           |
|--------|--------------------------------------------|------------------------|
| GET    | `/api/timesheets`                          | List timesheets (paginated + filtered) |
| POST   | `/api/timesheets`                          | Create a new timesheet |
| GET    | `/api/timesheets/:id`                      | Get a single timesheet |
| POST   | `/api/timesheets/:id/entries`              | Add an entry           |
| PUT    | `/api/timesheets/:id/entries/:entryId`     | Edit an entry          |
| DELETE | `/api/timesheets/:id/entries/:entryId`     | Delete an entry        |

All routes require an active session. Unauthorized requests return `401`.

---

## Run Tests

```bash
npm test
```

Tests cover: `Button`, `StatusBadge`, `calcStatus` logic, and `dateUtils` helpers.

---

## Notes

- The in-memory store resets on every server restart — this is expected for a mock setup
- Seed data lives in `src/data/mockDb.ts` — 10 weeks of pre-filled timesheets for John Doe
- To connect a real backend later: replace `mockTimesheetService.ts` with real API calls — the route structure stays the same
- Time spent: ~5–6 hours