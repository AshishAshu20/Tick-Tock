import { MOCK_TIMESHEETS, MOCK_USERS, calcStatus } from "@/data/mockDb";
import type { Timesheet, EntryFormValues, TimesheetFilters, TimesheetStatus } from "@/types";

let store: Timesheet[] = JSON.parse(JSON.stringify(MOCK_TIMESHEETS));

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

const generateId = () => Math.random().toString(36).slice(2, 10);

export const mockLogin = async (email: string, password: string) => {
  await delay(400);
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) throw new Error("Invalid email or password.");
  const { password: _pw, ...safeUser } = user;
  return { user: safeUser, token: `mock-token-${safeUser._id}` };
};

export const mockGetTimesheets = async (
  page: number,
  limit: number,
  filters: TimesheetFilters
) => {
  await delay(250);

  let results = [...store];

  if (filters.status) {
    results = results.filter((t) => t.status === filters.status);
  }

  if (filters.startDate) {
    results = results.filter((t) => t.startDate >= filters.startDate);
  }
  if (filters.endDate) {
    results = results.filter((t) => t.startDate <= filters.endDate + "T23:59:59.000Z");
  }

  results.sort((a, b) => b.weekNumber - a.weekNumber);

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const paginated = results.slice((page - 1) * limit, page * limit);

  return {
    data: paginated,
    pagination: { total, page, limit, totalPages },
  };
};

export const mockGetTimesheetById = async (id: string) => {
  await delay(150);
  const ts = store.find((t) => t._id === id);
  if (!ts) throw new Error("Timesheet not found.");
  return { data: ts };
};

export const mockCreateTimesheet = async (payload: {
  startDate: string;
  endDate: string;
  entries?: Partial<EntryFormValues>[];
}) => {
  await delay(350);

  const start = new Date(payload.startDate);
  const weekNumber = getWeekNumber(start);
  const year = start.getFullYear();

  const exists = store.find((t) => t.weekNumber === weekNumber && t.year === year);
  if (exists) throw new Error("A timesheet for this week already exists.");

  const entries = (payload.entries || []).map((e) => ({
    _id: generateId(),
    date: e.date || payload.startDate,
    projectName: e.projectName || "",
    typeOfWork: e.typeOfWork || "Other",
    taskDescription: e.taskDescription || "",
    hours: e.hours || 0,
  })) as Timesheet["entries"];

  const newTs: Timesheet = {
    _id: generateId(),
    user: "65a1b2c3d4e5f6789012345a",
    weekNumber,
    year,
    startDate: payload.startDate,
    endDate: payload.endDate,
    entries,
    status: calcStatus(entries),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store = [...store, newTs];
  return { data: newTs };
};

export const mockAddEntry = async (timesheetId: string, entry: EntryFormValues) => {
  await delay(300);
  const ts = store.find((t) => t._id === timesheetId);
  if (!ts) throw new Error("Timesheet not found.");

  const newEntry = { _id: generateId(), ...entry } as Timesheet["entries"][0];
  const updatedEntries = [...ts.entries, newEntry];
  const updated: Timesheet = {
    ...ts,
    entries: updatedEntries,
    status: calcStatus(updatedEntries),
    updatedAt: new Date().toISOString(),
  };

  store = store.map((t) => (t._id === timesheetId ? updated : t));
  return { data: updated };
};

export const mockUpdateEntry = async (
  timesheetId: string,
  entryId: string,
  values: EntryFormValues
) => {
  await delay(300);
  const ts = store.find((t) => t._id === timesheetId);
  if (!ts) throw new Error("Timesheet not found.");

  const updatedEntries = ts.entries.map((e:any) =>
    e._id === entryId ? { ...e, ...values } : e
  );
  const updated: Timesheet = {
    ...ts,
    entries: updatedEntries,
    status: calcStatus(updatedEntries),
    updatedAt: new Date().toISOString(),
  };

  store = store.map((t) => (t._id === timesheetId ? updated : t));
  return { data: updated };
};

export const mockDeleteEntry = async (timesheetId: string, entryId: string) => {
  await delay(250);
  const ts = store.find((t) => t._id === timesheetId);
  if (!ts) throw new Error("Timesheet not found.");

  const updatedEntries = ts.entries.filter((e:any) => e._id !== entryId);
  const updated: Timesheet = {
    ...ts,
    entries: updatedEntries,
    status: calcStatus(updatedEntries),
    updatedAt: new Date().toISOString(),
  };

  store = store.map((t) => (t._id === timesheetId ? updated : t));
  return { data: updated };
};

const getWeekNumber = (date: Date): number => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};
