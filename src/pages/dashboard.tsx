import React, { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TimesheetTable from "@/components/timesheets/TimesheetTable";
import TimesheetFilters from "@/components/timesheets/TimesheetFilters";
import EntryFormModal from "@/components/timesheets/EntryFormModal";
import Pagination from "@/components/ui/Pagination";
import { useTimesheets } from "@/hooks/useTimesheets";
import type { Timesheet, EntryFormValues } from "@/types";

export default function DashboardPage() {
  const router = useRouter();

  const {
    timesheets, loading, error,
    page, limit, totalPages,
    filters,
    fetchTimesheets, applyFilters, goToPage, changeLimit,
    createTimesheet,
  } = useTimesheets();

  const [createOpen, setCreateOpen] = useState(false);
  const [creatingFor, setCreatingFor] = useState<Timesheet | null>(null);

  useEffect(() => {
    fetchTimesheets(1, { status: "", startDate: "", endDate: "" });
  }, []);

  const handleView = (ts: Timesheet) => router.push(`/timesheets/${ts._id}`);
  const handleUpdate = (ts: Timesheet) => router.push(`/timesheets/${ts._id}`);

  const handleCreate = (ts: Timesheet) => {
    setCreatingFor(ts);
    setCreateOpen(true);
  };

  const handleCreateSubmit = async (values: EntryFormValues) => {
    if (!creatingFor) return;
    const newTs = await createTimesheet({
      startDate: creatingFor.startDate,
      endDate: creatingFor.endDate,
      entries: [values],
    });
    if (newTs) {
      setCreateOpen(false);
      setCreatingFor(null);
      router.push(`/timesheets/${newTs._id}`);
    }
  };

  return (
    <>
      <Head>
        <title>Timesheets — ticktock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />

        <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Your Timesheets</h1>
              <TimesheetFilters filters={filters} onApply={applyFilters} />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading timesheets…</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <p className="text-sm text-red-500">{error}</p>
                <button onClick={() => fetchTimesheets(1, filters)} className="text-sm text-blue-600 hover:underline">
                  Retry
                </button>
              </div>
            ) : timesheets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-sm text-gray-400">No timesheets found.</p>
              </div>
            ) : (
              <TimesheetTable
                timesheets={timesheets}
                onView={handleView}
                onUpdate={handleUpdate}
                onCreate={handleCreate}
              />
            )}

            {!loading && timesheets.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  limit={limit}
                  onLimitChange={changeLimit}
                />
              </div>
            )}
          </div>

          <Footer/>
        </main>
      </div>

      <EntryFormModal
        isOpen={createOpen}
        onClose={() => { setCreateOpen(false); setCreatingFor(null); }}
        onSubmit={handleCreateSubmit}
        mode="add"
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) return { redirect: { destination: "/login", permanent: false } };
  return { props: {} };
};
