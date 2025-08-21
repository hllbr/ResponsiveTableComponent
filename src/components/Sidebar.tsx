import React from "react";
import { Link, useLocation } from "react-router-dom";
import DataControls from "./DataControls";

const examples = [
  {
    id: "basic",
    title: "Temel Örnek",
    path: "/",
    description: "Az veri ile temel tablo",
  },
  {
    id: "large-data",
    title: "Büyük Veri",
    path: "/large-data",
    description: "Çok veri ile scroll örneği",
  },
  {
    id: "no-pagination",
    title: "Pagination Yok",
    path: "/no-pagination",
    description: "Pagination olmadan tablo",
  },
  {
    id: "loading",
    title: "Yükleniyor",
    path: "/loading",
    description: "Loading durumu örneği",
  },
  {
    id: "no-filter",
    title: "Filter Yok",
    path: "/no-filter",
    description: "Filter olmadan tablo",
  },
];

interface SidebarProps {
  // Current page path
  currentPath?: string;
  // Table control props for current page
  pageSize?: number;
  totalRows?: number;
  onPageSizeChange?: (size: number) => void;
  onTotalRowsChange?: (total: number) => void;
  withFilter?: boolean;
  withPagination?: boolean;
  loading?: boolean;
  onFilterToggle?: (enabled: boolean) => void;
  onPaginationToggle?: (enabled: boolean) => void;
  onLoadingToggle?: (enabled: boolean) => void;
  showNoData?: boolean;
  onNoDataToggle?: (enabled: boolean) => void;
  onDelayedLoadingTest?: (delaySeconds: number) => void;
  onErrorTest?: () => void;
}

export default function Sidebar({
  currentPath,
  pageSize = 5,
  totalRows = 5,
  onPageSizeChange,
  onTotalRowsChange,
  withFilter = true,
  withPagination = true,
  loading = false,
  onFilterToggle,
  onPaginationToggle,
  onLoadingToggle,
  showNoData = false,
  onNoDataToggle,
  onDelayedLoadingTest,
  onErrorTest,
}: SidebarProps) {
  const location = useLocation();

  // Show controls only for specific pages
  const showControls = [
    "/",
    "/full-page",
    "/header-table",
    "/large-data",
    "/no-pagination",
    "/loading",
    "/no-filter",
  ].includes(location.pathname);

  return (
    <div className="w-80 bg-pink-200 border-r border-pink-300 h-screen overflow-y-auto flex flex-col">
      {/* Navigation */}
      <div className="p-3 space-y-2">
        <Link
          to="/"
          className={`block w-full p-3 rounded-lg text-center transition-colors ${
            location.pathname === "/"
              ? "bg-pink-600 text-white font-semibold"
              : "bg-pink-300 text-pink-800 hover:bg-pink-400"
          }`}
        >
          🏠 Home
        </Link>

        <Link
          to="/full-page"
          className={`block w-full p-3 rounded-lg text-center transition-colors ${
            location.pathname === "/full-page"
              ? "bg-pink-600 text-white font-semibold"
              : "bg-pink-300 text-pink-800 hover:bg-pink-400"
          }`}
        >
          📊 Full Page
        </Link>

        <Link
          to="/header-table"
          className={`block w-full p-3 rounded-lg text-center transition-colors ${
            location.pathname === "/header-table"
              ? "bg-pink-600 text-white font-semibold"
              : "bg-pink-300 text-pink-800 hover:bg-pink-400"
          }`}
        >
          📋 Header + Table
        </Link>
      </div>

      {/* Page Info Section */}
      <div className="p-3 border-t border-pink-300">
        <h3 className="text-sm font-semibold text-pink-800 mb-2">
          Aktif Sayfa
        </h3>
        <div className="bg-pink-300 rounded-lg p-2">
          <p className="text-pink-700 text-xs font-medium mb-1">
            {location.pathname === "/"
              ? "🏠 Ana Sayfa"
              : location.pathname === "/full-page"
              ? "📊 Full Page Table"
              : location.pathname === "/header-table"
              ? "📋 Header + Table Layout"
              : location.pathname === "/large-data"
              ? "📊 Büyük Veri"
              : location.pathname === "/no-pagination"
              ? "📄 Pagination Yok"
              : location.pathname === "/loading"
              ? "⏳ Loading"
              : location.pathname === "/no-filter"
              ? "🔍 Filter Yok"
              : "📄 Diğer Sayfa"}
          </p>
          {showControls && (
            <div className="text-xs text-pink-600 mt-1">
              <div className="flex justify-between">
                <span>Size: {pageSize}</span>
                <span>Total: {totalRows}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>F: {withFilter ? "ON" : "OFF"}</span>
                <span>P: {withPagination ? "ON" : "OFF"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Controls */}
      {showControls && onPageSizeChange && (
        <div className="flex-1 border-t border-pink-300 min-h-0">
          <DataControls
            pageSize={pageSize}
            totalRows={totalRows}
            onPageSizeChange={onPageSizeChange}
            onTotalRowsChange={onTotalRowsChange}
            withFilter={withFilter}
            withPagination={withPagination}
            loading={loading}
            onFilterToggle={onFilterToggle}
            onPaginationToggle={onPaginationToggle}
            onLoadingToggle={onLoadingToggle}
            showNoData={showNoData}
            onNoDataToggle={onNoDataToggle}
            onDelayedLoadingTest={onDelayedLoadingTest}
            onErrorTest={onErrorTest}
          />
        </div>
      )}

      {/* Info for pages without controls */}
      {!showControls && (
        <div className="p-3 border-t border-pink-300">
          <div className="text-xs text-pink-600">
            <div className="font-medium mb-2">Bu sayfa:</div>
            <p className="text-pink-700">Kontrol paneli yok</p>
          </div>
        </div>
      )}
    </div>
  );
}
