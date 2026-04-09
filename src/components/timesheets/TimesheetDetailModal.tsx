import React, { useState } from "react";
import { MoreHorizontal, Plus, Edit2, Trash2 } from "lucide-react";
import type { Timesheet, TimesheetEntry, EntryFormValues } from "@/types";
import Modal from "@/components/ui/Modal";
import EntryFormModal from "./EntryFormModal";
import { getTotalHours } from "@/lib/dateUtils";
import StatusBadge from "@/components/ui/StatusBadge";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  timesheet: Timesheet | null;
  onAddEntry: (values: EntryFormValues) => Promise<boolean>;
  onEditEntry: (entryId: string, values: EntryFormValues) => Promise<boolean>;
  onDeleteEntry: (entryId: string) => Promise<boolean>;
  readOnly?: boolean;
}

const TimesheetDetailModal: React.FC<Props> = ({
  isOpen, onClose, timesheet,
  onAddEntry, onEditEntry, onDeleteEntry,
  readOnly = false,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!timesheet) return null;

  const totalHours = getTotalHours(timesheet.entries);
  const pct = Math.min(100, Math.round((totalHours / 40) * 100));

  const grouped: Record<string, TimesheetEntry[]> = {};
  [...timesheet.entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((e) => {
      const day = e.date.split("T")[0];
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(e);
    });

  const handleAdd = async (values: EntryFormValues) => {
    const ok = await onAddEntry(values);
    if (ok) setShowAdd(false);
  };

  const handleEdit = async (values: EntryFormValues) => {
    if (!editingEntry) return;
    const ok = await onEditEntry(editingEntry._id, values);
    if (ok) setEditingEntry(null);
  };

  const handleDelete = async (entryId: string) => {
    setDeletingId(entryId);
    await onDeleteEntry(entryId);
    setDeletingId(null);
    setMenuOpen(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={``}
        largeScreen="max-w-3xl"
      >
        <div className="flex justify-between">
          <div>
            <h2 id="modal-title" className="text-base font-semibold text-gray-900">
              {`This week's timesheets`}
            </h2>
            <span className="text-xs text-gray-500">
              {new Date(timesheet.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              {" – "}
              {new Date(timesheet.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <div className="mb-5 w-[200px]">
            <div className="flex items-center justify-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700">{totalHours}/40 hrs</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="progress-track w-[160px] mt-1">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-gray-400">{pct}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-1 -mr-1">
          {Object.entries(grouped).map(([day, entries]) => (
            <div key={day} className="flex">
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5 items-center m-3 w-[70px]">
                {new Date(day + "T12:00:00").toLocaleDateString("en-US", {
                  day: "numeric", month: "short",
                })}
              </p>
              {entries.map((entry) => (
                <div className="w-full">
                  <div
                    key={entry._id}
                    className="group  flex items-center justify-between py-2 px-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all mb-1.5 relative"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {entry.taskDescription}
                      </p>
                      <p className="text-xs text-gray-400">{entry.typeOfWork}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-semibold text-gray-600">{entry.hours} hrs</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {entry.projectName}
                      </span>
                      {!readOnly && (
                        <div className="relative">
                          <button
                            onClick={() => setMenuOpen(menuOpen === entry._id ? null : entry._id)}
                            className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <MoreHorizontal size={14} />
                          </button>
                          {menuOpen === entry._id && (
                            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 animate-fade-in">
                              <button
                                onClick={() => { setEditingEntry(entry); setMenuOpen(null); }}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit2 size={12} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(entry._id)}
                                disabled={deletingId === entry._id}
                                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={12} />
                                {deletingId === entry._id ? "…" : "Delete"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {!readOnly && (
                    <button
                      onClick={() => setShowAdd(true)}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 border border-dashed hover:border-blue-300 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Plus size={14} /> Add new task
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}

          {timesheet.entries.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No entries yet.</p>
          )}
        </div>


      </Modal>

      <EntryFormModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleAdd}
        mode="add"

      <EntryFormModal
        isOpen={!!editingEntry}
        onClose={() => setEditingEntry(null)}
        onSubmit={handleEdit}
        initialValues={
          editingEntry
            ? {
              projectName: editingEntry.projectName,
              typeOfWork: editingEntry.typeOfWork,
              taskDescription: editingEntry.taskDescription,
              hours: editingEntry.hours,
              date: editingEntry.date.split("T")[0],
            }
            : undefined
        }
        mode="edit"
    </>
  );
};

export default TimesheetDetailModal;
