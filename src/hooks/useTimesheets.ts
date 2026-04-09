import { useState, useCallback } from "react";
import type { Timesheet, TimesheetFilters, EntryFormValues } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";

const DEFAULT_FILTERS: TimesheetFilters = { status: "", startDate: "", endDate: "" };

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<TimesheetFilters>(DEFAULT_FILTERS);

  const fetchTimesheets = useCallback(
    async (currentPage = 1, currentFilters = DEFAULT_FILTERS,currentLimit = limit) => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string> = {
          page: String(currentPage),
          limit: String(currentLimit),
        };
        if (currentFilters.status) params.status = currentFilters.status;
        if (currentFilters.startDate) params.startDate = currentFilters.startDate;
        if (currentFilters.endDate) params.endDate = currentFilters.endDate;

        const { data } = await axios.get("/api/timesheets", { params });
        setTimesheets(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
        setPage(currentPage);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Failed to load timesheets";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const applyFilters = useCallback(
    (newFilters: TimesheetFilters) => {
      setFilters(newFilters);
      fetchTimesheets(1, newFilters);
    },
    [fetchTimesheets]
  );

  const changeLimit = useCallback(
  (newLimit: number) => {
    setLimit(newLimit);
    fetchTimesheets(1, filters, newLimit);
  },
  [fetchTimesheets, filters]
);

  const goToPage = useCallback(
    (newPage: number) => {
      fetchTimesheets(newPage, filters);
    },
    [fetchTimesheets, filters]
  );

  const addEntry = useCallback(
    async (timesheetId: string, entry: EntryFormValues): Promise<boolean> => {
      try {
        const { data } = await axios.post(
          `/api/timesheets/${timesheetId}/entries`,
          entry
        );
        if (data.success && data.data) {
          setTimesheets((prev) =>
            prev.map((ts) => (ts._id === timesheetId ? data.data : ts))
          );
          toast.success("Entry added!");
          return true;
        }
        return false;
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to add entry");
        return false;
      }
    },
    []
  );

  const updateEntry = useCallback(
    async (
      timesheetId: string,
      entryId: string,
      entry: EntryFormValues
    ): Promise<boolean> => {
      try {
        const { data } = await axios.put(
          `/api/timesheets/${timesheetId}/entries/${entryId}`,
          entry
        );
        if (data.success && data.data) {
          setTimesheets((prev) =>
            prev.map((ts) => (ts._id === timesheetId ? data.data : ts))
          );
          toast.success("Entry updated!");
          return true;
        }
        return false;
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to update entry");
        return false;
      }
    },
    []
  );

  const deleteEntry = useCallback(
    async (timesheetId: string, entryId: string): Promise<boolean> => {
      try {
        const { data } = await axios.delete(
          `/api/timesheets/${timesheetId}/entries/${entryId}`
        );
        if (data.success && data.data) {
          setTimesheets((prev) =>
            prev.map((ts) => (ts._id === timesheetId ? data.data : ts))
          );
          toast.success("Entry deleted");
          return true;
        }
        return false;
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete entry");
        return false;
      }
    },
    []
  );

  const createTimesheet = useCallback(
    async (payload: {
      startDate: string;
      endDate: string;
      entries?: Partial<EntryFormValues>[];
    }): Promise<Timesheet | null> => {
      try {
        const { data } = await axios.post("/api/timesheets", payload);
        if (data.success && data.data) {
          toast.success("Timesheet created!");
          return data.data as Timesheet;
        }
        return null;
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to create timesheet");
        return null;
      }
    },
    []
  );

  return {
    timesheets,
    loading,
    error,
    page,
    limit,
    totalPages,
    total,
    filters,
    fetchTimesheets,
    applyFilters,
    goToPage,
    changeLimit,
    addEntry,
    updateEntry,
    deleteEntry,
    createTimesheet,
  };
};
