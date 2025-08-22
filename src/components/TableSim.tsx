import React from "react";
import { useMeasureLayout } from "../hooks/useMeasureLayout";

type Props = {
  withFilter?: boolean;
  withPagination?: boolean;
  pageSize: number; // 1..200
  totalRows: number; // demo toplam
  loading?: boolean;
  className?: string;
};

export default function TableSim({
  withFilter = true,
  withPagination = true,
  pageSize,
  totalRows,
  loading,
  className = "",
}: Props) {
  const {
    containerRef,
    headerRef,
    filterRef,
    paginationRef,
    scrollAreaRef,
    theadRef,
    tbodyRef,
  } = useMeasureLayout();

  const visibleRows = Math.min(pageSize, totalRows);
  const rows = Array.from({ length: visibleRows }, (_, i) => i + 1);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden rounded border shadow-sm bg-white ${className}`}
    >
      {/* Üst Bölüm: Header + Titles + Filter — scroll DIŞINDA, sabit */}
      <div className="flex-shrink-0">
        {/* Header */}
        <div ref={headerRef} className="px-3 py-2 text-white bg-indigo-600">
          header
        </div>

        {/* Table Headers */}
        <div ref={theadRef} className="bg-purple-200 border-b">
          <div className="grid grid-cols-3 gap-0">
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Device
            </div>
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Owner
            </div>
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Status
            </div>
          </div>
        </div>

        {/* Filter */}
        {withFilter && (
          <div ref={filterRef} className="px-3 py-2 text-white bg-emerald-600">
            filter
          </div>
        )}
      </div>

      {/* Orta Bölüm: Scroll alanı - SADECE tablo verisi (tbody) */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto overflow-x-auto overscroll-contain"
      >
        {/* Sadece Table Body */}
        <div className="w-full">
          {loading ? (
            <div className="px-3 py-8 text-center text-slate-500">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="px-3 py-12 text-center text-slate-500">No Data</div>
          ) : (
            <div ref={tbodyRef}>
              {rows.map((n) => (
                <div
                  key={n}
                  className="grid grid-cols-3 gap-0 odd:bg-cyan-50 even:bg-cyan-100 border-b"
                >
                  <div className="px-3 py-3">Device #{n}</div>
                  <div className="px-3 py-3">User {n}</div>
                  <div className="px-3 py-3">{n % 2 ? "Active" : "Idle"}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alt Bölüm: Pagination — scroll alanının DIŞINDA */}
      {withPagination && (
        <div
          ref={paginationRef}
          className="flex-shrink-0 bg-orange-500 text-black px-3 py-2 border-t flex items-center justify-between"
        >
          <div className="text-sm">
            Showing {Math.min(pageSize, totalRows)} of {totalRows} entries
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50">
              ‹ Prev
            </button>
            <span className="text-sm">
              Page 1 of {Math.ceil(totalRows / pageSize)}
            </span>
            <button className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50">
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
