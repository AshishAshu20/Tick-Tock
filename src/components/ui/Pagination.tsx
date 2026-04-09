import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

const LIMIT_OPTIONS = [5, 10, 15, 20];

const getPages = (cur: number, total: number): (number | "…")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 3) return [1, 2, 3, 4, "…", total];
  if (cur >= total - 2) return [1, "…", total - 3, total - 2, total - 1, total];
  return [1, "…", cur - 1, cur, cur + 1, "…", total];
};

const Pagination: React.FC<Props> = ({ page, totalPages, onPageChange, limit, onLimitChange }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pages = getPages(page, totalPages);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="relative" ref={wrapRef}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>{limit} per page</span>
          <ChevronDown
            size={12}
            className={clsx("text-gray-400 transition-transform", open && "rotate-180")}/>
        </button>

        {open && (
          <div className="absolute top-[calc(100%+4px)] left-0 z-10 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm min-w-full">
            {LIMIT_OPTIONS.map((l) => (
              <button
                key={l}
                onClick={() => { onLimitChange(l); setOpen(false); }}
                className={clsx(
                  "w-full text-left px-3 py-1.5 text-sm transition-colors hover:bg-gray-50",
                  l === limit ? "font-medium text-blue-600 bg-blue-50" : "text-gray-700"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`dot-${i}`} className="w-6 text-center text-sm text-gray-400">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={clsx(
                "w-8 h-8 rounded text-sm font-medium transition-colors",
                page === p
                  ? " text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;