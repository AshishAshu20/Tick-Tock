import React from "react";
import type { TimesheetStatus } from "@/types";

interface Props {
  status: TimesheetStatus;
}

const config: Record<TimesheetStatus, { label: string; cls: string }> = {
  completed:  { label: "COMPLETED",  cls: "badge-completed"  },
  incomplete: { label: "INCOMPLETE", cls: "badge-incomplete" },
  missing:    { label: "MISSING",    cls: "badge-missing"    },
};

const StatusBadge: React.FC<Props> = ({ status }) => {
  const { label, cls } = config[status];
  return <span className={cls}>{label}</span>;
};

export default StatusBadge;
