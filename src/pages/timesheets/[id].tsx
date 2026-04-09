import React, { useEffect, useState, useCallback, useRef } from "react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Plus, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EntryFormModal from "@/components/timesheets/EntryFormModal";
import type { Timesheet, TimesheetEntry, EntryFormValues } from "@/types";
import { getTotalHours } from "@/lib/dateUtils";


const eachDayOfWeek = (start: string, end: string): string[] => {
  const days: string[] = [];
  const cur = new Date(start + "T12:00:00");
  const fin = new Date(end + "T12:00:00");
  while (cur <= fin) {
    days.push(cur.toISOString().split("T")[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

const fmtDayLabel = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const fmtHeaderRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const sDay = s.getDate();
  const eDay = e.getDate();
  const month = s.toLocaleDateString("en-US", { month: "long" });
  const year = s.getFullYear();
  return `${sDay} – ${eDay} ${month}, ${year}`;
};


export default function TimesheetDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addModalDate, setAddModalDate] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchTimesheet = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/timesheets/${id}`);
      setTimesheet(data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load timesheet");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTimesheet();
  }, [fetchTimesheet]);

  const handleAddEntry = async (values: EntryFormValues): Promise<boolean> => {
    if (!timesheet) return false;
    try {
      const { data } = await axios.post(`/api/timesheets/${timesheet._id}/entries`, values);
      if (data.success && data.data) {
        setTimesheet(data.data);
        toast.success("Entry added!");
        setAddModalDate(null);
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add entry");
      return false;
    }
  };

  const handleEditEntry = async (values: EntryFormValues): Promise<boolean> => {
    if (!timesheet || !editingEntry) return false;
    try {
      const { data } = await axios.put(
        `/api/timesheets/${timesheet._id}/entries/${editingEntry._id}`,
        values
      );
      if (data.success && data.data) {
        setTimesheet(data.data);
        toast.success("Entry updated!");
        setEditingEntry(null);
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update entry");
      return false;
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!timesheet) return;
    setDeletingId(entryId);
    try {
      const { data } = await axios.delete(
        `/api/timesheets/${timesheet._id}/entries/${entryId}`
      );
      if (data.success && data.data) {
        setTimesheet(data.data);
        toast.success("Entry deleted");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete entry");
    } finally {
      setDeletingId(null);
      setMenuOpen(null);
    }
  };

  const totalHours = timesheet ? getTotalHours(timesheet.entries) : 0;
  const pct = Math.min(100, Math.round((totalHours / 40) * 100));

  const weekDays = timesheet
    ? eachDayOfWeek(
      timesheet.startDate.split("T")[0],
      timesheet.endDate.split("T")[0]
    )
    : [];

  const entriesByDay: Record<string, TimesheetEntry[]> = {};
  if (timesheet) {
    weekDays.forEach((day) => {
      entriesByDay[day] = timesheet.entries.filter(
        (e:any) => e.date.split("T")[0] === day
      );
    });
  }

  return (
    <>
      <Head>
        <title>This week's timesheet — ticktock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"/>
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full">

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading timesheet…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <p className="text-sm text-red-500">{error}</p>
              <button onClick={fetchTimesheet} className="text-sm text-blue-600 hover:underline">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && timesheet && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-fade-in">
              <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                <div>
                  <h1 className="text-base font-semibold text-gray-900">
                    This week's timesheet
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {fmtHeaderRange(timesheet.startDate, timesheet.endDate)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5 min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-700">
                      {totalHours}/40 hrs
                    </span>
                    <span className="text-xs text-gray-400">{pct}%</span>
                  </div>
                  <div className="progress-track w-[140px]">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {weekDays.map((day) => {
                  const dayEntries = entriesByDay[day] || [];

                  return (
                    <div key={day}>
                      {dayEntries.map((entry, idx) => (
                        <div
                          key={entry._id}
                          className="flex items-center gap-2 hover:bg-gray-50 transition-colors "
                        >
                          <div className="w-[72px] shrink-0 px-6 py-3">
                            {idx === 0 && (
                              <span className="text-sm font-semibold uppercase whitespace-nowrap">
                                {fmtDayLabel(day)}
                              </span>
                            )}
                          </div>

                          <div className="flex w-full border border-gray-200 rounded-lg mx-2 px-2 flex-wrap">

  <div className=" sm:flex-1  min-w-4 py-3 pr-4">
    <p className="text-sm text-gray-800 truncate w-[70%]">
      {entry.taskDescription}
    </p>
  </div>

  <div className="flex items-center gap-2 py-3 w-full sm:w-auto">
    <span className="text-sm text-gray-500 shrink-0">
      {entry.hours} hrs
    </span>

    <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full whitespace-nowrap font-medium">
      {entry.projectName}
    </span>

    <div className="ml-auto relative shrink-0" ref={menuOpen === entry._id ? menuRef : undefined}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(menuOpen === entry._id ? null : entry._id);
        }}
        className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>

      {menuOpen === entry._id && (
        <div className="absolute right-0 top-8 w-24 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 animate-fade-in">
          <button
            onClick={() => { setEditingEntry(entry); setMenuOpen(null); }}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Edit2 size={12} /> Edit
          </button>
          <button
            onClick={() => handleDeleteEntry(entry._id)}
            disabled={deletingId === entry._id}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 size={12} />
            {deletingId === entry._id ? "…" : "Delete"}
          </button>
        </div>
      )}
    </div>
  </div>

</div>

                        </div>
                      ))}

                      <div className="flex items-center gap-0">
                        {dayEntries.length === 0 && (
                          <div className="w-[72px] shrink-0 px-6 py-2">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                              {fmtDayLabel(day)}
                            </span>
                          </div>
                        )}
                        {dayEntries.length > 0 && (
                          <div className="w-[72px] shrink-0" />
                        )}

                        <div className="flex-1 px-1 py-2 mx-1 ml-3 w-full">
                          <button
                            onClick={() => setAddModalDate(day)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 hover:border-blue-400 rounded-lg text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Plus size={13} />
                            Add new task
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-3" />
            </div>
          )}

          <Footer/>
        </main>
      </div>

      <EntryFormModal
        isOpen={!!addModalDate}
        onClose={() => setAddModalDate(null)}
        onSubmit={handleAddEntry}
        defaultDate={addModalDate ?? undefined}
        mode="add"
        />

      <EntryFormModal
        isOpen={!!editingEntry}
        onClose={() => setEditingEntry(null)}
        onSubmit={handleEditEntry}
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
        />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) return { redirect: { destination: "/login", permanent: false } };
  return { props: {} };
};
