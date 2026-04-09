import type { MockUser, Timesheet } from "@/types";

export const MOCK_USERS: MockUser[] = [
  {
    _id: "65a1b2c3d4e5f6789012345a",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
];

export const MOCK_TIMESHEETS: Timesheet[] = [
  {
    _id: "65a1b2c3d4e5f6789012001a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 1,
    year: 2024,
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-01-05T00:00:00.000Z",
    status: "completed",
    createdAt: "2024-01-05T18:00:00.000Z",
    updatedAt: "2024-01-05T18:00:00.000Z",
    entries: [
      { _id: "e001a", date: "2024-01-01T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Built user authentication module with JWT tokens",          hours: 8 },
      { _id: "e001b", date: "2024-01-01T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Meeting",             taskDescription: "Kickoff meeting with client stakeholders",                 hours: 2 },
      { _id: "e001c", date: "2024-01-02T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Implemented dashboard layout and sidebar navigation",       hours: 8 },
      { _id: "e001d", date: "2024-01-03T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Bug fixes",           taskDescription: "Fixed login redirect loop on session expiry",              hours: 4 },
      { _id: "e001e", date: "2024-01-03T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Documentation",       taskDescription: "Wrote API documentation for authentication endpoints",      hours: 4 },
      { _id: "e001f", date: "2024-01-04T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Feature development", taskDescription: "Set up Stripe payment integration and webhooks",            hours: 8 },
      { _id: "e001g", date: "2024-01-05T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Code review",         taskDescription: "Reviewed and merged 4 pull requests from the team",        hours: 4 },
      { _id: "e001h", date: "2024-01-05T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Testing",             taskDescription: "Wrote unit tests for authentication service",               hours: 2 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012002a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 2,
    year: 2024,
    startDate: "2024-01-08T00:00:00.000Z",
    endDate: "2024-01-12T00:00:00.000Z",
    status: "completed",
    createdAt: "2024-01-12T18:00:00.000Z",
    updatedAt: "2024-01-12T18:00:00.000Z",
    entries: [
      { _id: "e002a", date: "2024-01-08T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Feature development", taskDescription: "Built notification system with email and in-app alerts",   hours: 8 },
      { _id: "e002b", date: "2024-01-09T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Implemented user profile page with avatar upload",          hours: 7 },
      { _id: "e002c", date: "2024-01-09T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Meeting",             taskDescription: "Sprint planning — defined tickets for sprint 3",            hours: 1 },
      { _id: "e002d", date: "2024-01-10T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Feature development", taskDescription: "Built client-facing report export to CSV and PDF",          hours: 8 },
      { _id: "e002e", date: "2024-01-11T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Bug fixes",           taskDescription: "Resolved memory leak in WebSocket connection handler",      hours: 5 },
      { _id: "e002f", date: "2024-01-11T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Code review",         taskDescription: "Reviewed front-end components PR 78 and 79",               hours: 3 },
      { _id: "e002g", date: "2024-01-12T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Testing",             taskDescription: "E2E tests for checkout flow using Playwright",               hours: 6 },
      { _id: "e002h", date: "2024-01-12T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Documentation",       taskDescription: "Updated README and deployment guide for staging env",        hours: 4 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012003a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 3,
    year: 2024,
    startDate: "2024-01-15T00:00:00.000Z",
    endDate: "2024-01-19T00:00:00.000Z",
    status: "incomplete",
    createdAt: "2024-01-19T18:00:00.000Z",
    updatedAt: "2024-01-19T18:00:00.000Z",
    entries: [
      { _id: "e003a", date: "2024-01-15T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Started work on analytics dashboard charts",                hours: 6 },
      { _id: "e003b", date: "2024-01-16T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Bug fixes",           taskDescription: "Fixed broken date picker in filter panel",                  hours: 3 },
      { _id: "e003c", date: "2024-01-17T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Testing",             taskDescription: "Added integration tests for payment endpoints",              hours: 5 },
      { _id: "e003d", date: "2024-01-18T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Meeting",             taskDescription: "Retrospective and backlog grooming session",                 hours: 2 },
      { _id: "e003e", date: "2024-01-19T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Documentation",       taskDescription: "Documented webhook event types and payload schemas",          hours: 4 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012004a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 4,
    year: 2024,
    startDate: "2024-01-22T00:00:00.000Z",
    endDate: "2024-01-26T00:00:00.000Z",
    status: "completed",
    createdAt: "2024-01-26T18:00:00.000Z",
    updatedAt: "2024-01-26T18:00:00.000Z",
    entries: [
      { _id: "e004a", date: "2024-01-22T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Feature development", taskDescription: "Implemented role-based access control (RBAC)",              hours: 8 },
      { _id: "e004b", date: "2024-01-23T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Feature development", taskDescription: "Added multi-language i18n support for EN FR AR",            hours: 8 },
      { _id: "e004c", date: "2024-01-24T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Code review",         taskDescription: "Reviewed RBAC implementation and security audit",            hours: 4 },
      { _id: "e004d", date: "2024-01-24T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Bug fixes",           taskDescription: "Fixed CORS policy blocking mobile API requests",             hours: 4 },
      { _id: "e004e", date: "2024-01-25T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Feature development", taskDescription: "Built internal Slack bot for deployment notifications",      hours: 8 },
      { _id: "e004f", date: "2024-01-26T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Testing",             taskDescription: "Load testing with k6 — optimised slow database queries",    hours: 4 },
      { _id: "e004g", date: "2024-01-26T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Meeting",             taskDescription: "Sprint demo with product owner and stakeholders",            hours: 4 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012005a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 5,
    year: 2024,
    startDate: "2024-01-29T00:00:00.000Z",
    endDate: "2024-02-02T00:00:00.000Z",
    status: "missing",
    createdAt: "2024-02-02T18:00:00.000Z",
    updatedAt: "2024-02-02T18:00:00.000Z",
    entries: [],
  },

  {
    _id: "65a1b2c3d4e5f6789012006a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 6,
    year: 2024,
    startDate: "2024-02-05T00:00:00.000Z",
    endDate: "2024-02-09T00:00:00.000Z",
    status: "completed",
    createdAt: "2024-02-09T18:00:00.000Z",
    updatedAt: "2024-02-09T18:00:00.000Z",
    entries: [
      { _id: "e006a", date: "2024-02-05T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Built drag-and-drop kanban board for task management",      hours: 8 },
      { _id: "e006b", date: "2024-02-06T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Feature development", taskDescription: "Integrated Algolia search across product catalogue",        hours: 8 },
      { _id: "e006c", date: "2024-02-07T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Bug fixes",           taskDescription: "Fixed PDF generation encoding issue for Arabic text",       hours: 4 },
      { _id: "e006d", date: "2024-02-07T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Code review",         taskDescription: "Peer reviewed search integration branch",                    hours: 4 },
      { _id: "e006e", date: "2024-02-08T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Feature development", taskDescription: "Built real-time collaboration with WebSockets and Redis",   hours: 8 },
      { _id: "e006f", date: "2024-02-09T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Testing",             taskDescription: "Wrote snapshot and unit tests for kanban components",       hours: 4 },
      { _id: "e006g", date: "2024-02-09T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Documentation",       taskDescription: "Documented search index configuration and ranking rules",    hours: 4 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012007a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 7,
    year: 2024,
    startDate: "2024-02-12T00:00:00.000Z",
    endDate: "2024-02-16T00:00:00.000Z",
    status: "incomplete",
    createdAt: "2024-02-16T18:00:00.000Z",
    updatedAt: "2024-02-16T18:00:00.000Z",
    entries: [
      { _id: "e007a", date: "2024-02-12T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Feature development", taskDescription: "Started dashboard redesign based on new Figma specs",       hours: 8 },
      { _id: "e007b", date: "2024-02-13T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Meeting",             taskDescription: "Design review session with UX team",                         hours: 2 },
      { _id: "e007c", date: "2024-02-14T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Bug fixes",           taskDescription: "Fixed infinite scroll pagination on mobile devices",        hours: 6 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012008a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 8,
    year: 2024,
    startDate: "2024-02-19T00:00:00.000Z",
    endDate: "2024-02-23T00:00:00.000Z",
    status: "missing",
    createdAt: "2024-02-23T18:00:00.000Z",
    updatedAt: "2024-02-23T18:00:00.000Z",
    entries: [],
  },

  {
    _id: "65a1b2c3d4e5f6789012009a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 9,
    year: 2024,
    startDate: "2024-02-26T00:00:00.000Z",
    endDate: "2024-03-01T00:00:00.000Z",
    status: "completed",
    createdAt: "2024-03-01T18:00:00.000Z",
    updatedAt: "2024-03-01T18:00:00.000Z",
    entries: [
      { _id: "e009a", date: "2024-02-26T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Feature development", taskDescription: "Implemented OAuth2 social login via Google and GitHub",     hours: 8 },
      { _id: "e009b", date: "2024-02-27T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Feature development", taskDescription: "Built CI/CD pipeline with GitHub Actions",                  hours: 8 },
      { _id: "e009c", date: "2024-02-28T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Code review",         taskDescription: "Reviewed OAuth implementation with security hardening",      hours: 4 },
      { _id: "e009d", date: "2024-02-28T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Bug fixes",           taskDescription: "Fixed session persistence issue after OAuth redirect",       hours: 4 },
      { _id: "e009e", date: "2024-02-29T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Testing",             taskDescription: "Wrote auth flow tests covering all OAuth providers",         hours: 8 },
      { _id: "e009f", date: "2024-03-01T00:00:00.000Z", projectName: "Project Gamma",  typeOfWork: "Documentation",       taskDescription: "Updated integration guide for OAuth setup steps",            hours: 4 },
      { _id: "e009g", date: "2024-03-01T00:00:00.000Z", projectName: "Internal Tools", typeOfWork: "Meeting",             taskDescription: "Q1 review and roadmap planning with engineering leads",      hours: 4 },
    ],
  },

  {
    _id: "65a1b2c3d4e5f6789012010a",
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber: 10,
    year: 2024,
    startDate: "2024-03-04T00:00:00.000Z",
    endDate: "2024-03-08T00:00:00.000Z",
    status: "incomplete",
    createdAt: "2024-03-08T18:00:00.000Z",
    updatedAt: "2024-03-08T18:00:00.000Z",
    entries: [
      { _id: "e010a", date: "2024-03-04T00:00:00.000Z", projectName: "Project Alpha",  typeOfWork: "Feature development", taskDescription: "Started building mobile-responsive table components",       hours: 6 },
      { _id: "e010b", date: "2024-03-05T00:00:00.000Z", projectName: "Client Portal",  typeOfWork: "Bug fixes",           taskDescription: "Fixed timezone offset bug in date range display",           hours: 3 },
      { _id: "e010c", date: "2024-03-06T00:00:00.000Z", projectName: "Project Beta",   typeOfWork: "Meeting",             taskDescription: "Mid-sprint sync with QA team and product manager",          hours: 3 },
    ],
  },
];

export const calcStatus = (entries: { hours: number }[]) => {
  const total = entries.reduce((s, e) => s + e.hours, 0);
  if (total === 0) return "missing" as const;
  if (total >= 40) return "completed" as const;
  return "incomplete" as const;
};
