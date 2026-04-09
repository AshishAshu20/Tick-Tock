import React, { useState } from "react";
import type { TimesheetFilters as Filters } from "@/types";
import { ChevronDown } from "lucide-react";

interface Props {
  filters: Filters;
  onApply: (f: Filters) => void;
}

const STATUS_OPTS = [
  { value: "", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
  { value: "missing", label: "Missing" },
];

const DATE_RANGE_OPTS = [
  { value: "", label: "All Dates" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
];

const getDateRange = (preset: string): { startDate: string; endDate: string } => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (preset === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { startDate: fmt(start), endDate: fmt(end) };
  }
  if (preset === "last_month") {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { startDate: fmt(start), endDate: fmt(end) };
  }
  if (preset === "this_year") {
    return {
      startDate: `${now.getFullYear()}-01-01`,
      endDate: `${now.getFullYear()}-12-31`,
    };
  }
  return { startDate: "", endDate: "" };
};

const TimesheetFilters: React.FC<Props> = ({ filters, onApply }) => {
  const [local, setLocal] = useState(filters);
  const [datePreset, setDatePreset] = useState("");

  const handleStatus = (value: string) => {
    const updated = { ...local, status: value };
    setLocal(updated);
    onApply(updated);
  };

  const handleDateRange = (preset: string) => {
    setDatePreset(preset);
    const { startDate, endDate } = getDateRange(preset);
    const updated = { ...local, startDate, endDate };
    setLocal(updated);
    onApply(updated);
  };

  const selectClass =
    "appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <select
          value={local.status}
          onChange={(e) => handleStatus(e.target.value)}
          className={selectClass}
        >
          {STATUS_OPTS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

      <div className="relative">
        <select
          value={datePreset}
          onChange={(e) => handleDateRange(e.target.value)}
          className={selectClass}
        >
          {DATE_RANGE_OPTS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default TimesheetFilters;