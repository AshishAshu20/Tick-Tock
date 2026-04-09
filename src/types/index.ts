export type TimesheetStatus = "completed" | "incomplete" | "missing";

export type TypeOfWork =
  | "Bug fixes"
  | "Feature development"
  | "Code review"
  | "Testing"
  | "Documentation"
  | "Meeting"
  | "Other";

export interface TimesheetEntry {
  _id: string;
  date: string;
  projectName: string;
  typeOfWork: TypeOfWork;
  taskDescription: string;
  hours: number;
}

export interface Timesheet {
  _id: string;
  user: string;
  weekNumber: number;
  year: number;
  startDate: string;
  endDate: string;
  entries: TimesheetEntry[];
  status: TimesheetStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MockUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface EntryFormValues {
  projectName: string;
  typeOfWork: TypeOfWork | "";
  taskDescription: string;
  hours: number;
  date: string;
}

export interface TimesheetFilters {
  status: TimesheetStatus | "";
  startDate: string;
  endDate: string;
}
