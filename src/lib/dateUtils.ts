import { format, parseISO } from "date-fns";

export const formatDateRange = (start: string, end: string): string => {
  const s = parseISO(start);
  const e = parseISO(end);
  const sMonth = format(s, "MMM");
  const eMonth = format(e, "MMM");
  const year = format(s, "yyyy");
  if (sMonth === eMonth) return `${format(s, "d")} - ${format(e, "d")} ${sMonth}, ${year}`;
  return `${format(s, "d MMM")} - ${format(e, "d MMM")}, ${year}`;
};

export const formatDate = (date: string) => format(parseISO(date), "MMM d, yyyy");
export const formatShortDate = (date: string) => format(parseISO(date), "EEE, MMM d");
export const getTotalHours = (entries: { hours: number }[]) =>
  entries.reduce((s, e) => s + e.hours, 0);
