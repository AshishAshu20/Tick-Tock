import React, { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Timesheet } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatDateRange } from "@/lib/dateUtils";

interface Props {
  timesheets: Timesheet[];
  onView: (ts: Timesheet) => void;
  onUpdate: (ts: Timesheet) => void;
  onCreate: (ts: Timesheet) => void;
}

type SortKey = "weekNumber" | "startDate" | "status";
type SortDir = "asc" | "desc";

const STATUS_ORDER: Record<string, number> = {
  missing: 0,
  incomplete: 1,
  completed: 2,
};

const TimesheetTable: React.FC<Props> = ({
  timesheets,
  onView,
  onUpdate,
  onCreate,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>("weekNumber");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(() => {
    return [...timesheets].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "weekNumber") {
        cmp = a.weekNumber - b.weekNumber;
      } else if (sortKey === "startDate") {
        cmp = a.startDate.localeCompare(b.startDate);
      } else if (sortKey === "status") {
        cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [timesheets, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={11} className="text-gray-400" />;
    return sortDir === "asc"
      ? <ArrowUp size={11} className="text-blue-500" />
      : <ArrowDown size={11} className="text-blue-500" />;
  };

  const getAction = (ts: Timesheet) => {
    if (ts.status === "completed")
      return (
        <button
          onClick={() => onView(ts)}
          className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          View
        </button>
      );
    if (ts.status === "incomplete")
      return (
        <button
          onClick={() => onUpdate(ts)}
          className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-800 transition-colors"
        >
          Update
        </button>
      );
    return (
      <button
        onClick={() => onCreate(ts)}
        className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-800 transition-colors"
      >
        Create
      </button>
    );
  };

  const COLS: { label: string; key?: SortKey }[] = [
    { label: "Week #", key: "weekNumber" },
    { label: "Date", key: "startDate" },
    { label: "Status", key: "status" },
    { label: "Actions" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {COLS.map((col, i) => (
              <th
                key={col.label}
                className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                  i === COLS.length - 1 ? "text-right" : "text-left"
                }`}
              >
                {col.key ? (
                  <button
                    onClick={() => handleSort(col.key!)}
                    className="flex items-center gap-1 hover:text-gray-700 select-none"
                  >
                    {col.label}
                    <SortIcon col={col.key} />
                  </button>
                ) : (
                  col.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map((ts) => (
            <tr key={ts._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3.5 font-medium text-gray-800">
                {ts.weekNumber}
              </td>
              <td className="px-4 py-3.5 text-gray-600">
                {formatDateRange(ts.startDate, ts.endDate)}
              </td>
              <td className="px-4 py-3.5">
                <StatusBadge status={ts.status} />
              </td>
              <td className="px-4 py-3.5 text-right">{getAction(ts)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable;