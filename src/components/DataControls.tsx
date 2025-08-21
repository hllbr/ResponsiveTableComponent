import React, { useState } from "react";

interface DataControlsProps {
  pageSize: number;
  totalRows: number;
  onPageSizeChange: (size: number) => void;
  onTotalRowsChange: (total: number) => void;
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

const pageSizeOptions = [1, 5, 10, 20, 25, 50, 100];
const totalRowsOptions = [1, 5, 10, 20, 25, 50, 100, 150, 200, 500, 1000];

export default function DataControls({
  pageSize,
  totalRows,
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
}: DataControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg border flex flex-col ${
        isOpen ? "h-[70vh]" : "h-auto"
      }`}
    >
      {/* Accordion Header - Tıklanabilir */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between ${
          isOpen ? "border-b rounded-t-lg" : "rounded-lg"
        }`}
      >
        <h3 className="font-medium text-gray-900 text-sm">Tablo Kontrolleri</h3>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Accordion Content - Açılır/Kapanır */}
      {isOpen && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Page Size Kontrolü */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Page Size
            </label>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} satır
                </option>
              ))}
            </select>
          </div>

          {/* Total Rows Kontrolü */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Total Rows
            </label>
            <select
              value={totalRows}
              onChange={(e) => onTotalRowsChange(Number(e.target.value))}
              className="w-full p-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {totalRowsOptions.map((total) => (
                <option key={total} value={total}>
                  {total} veri
                </option>
              ))}
            </select>
          </div>

          {/* Component Toggle Controls */}
          {(onFilterToggle || onPaginationToggle) && (
            <div className="border-t pt-2">
              <h4 className="font-medium text-gray-900 mb-2 text-xs">
                Bileşenler:
              </h4>
              <div className="space-y-2">
                {/* Filter Toggle */}
                {onFilterToggle && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="filter-toggle"
                      checked={withFilter}
                      onChange={(e) => onFilterToggle(e.target.checked)}
                      className="w-3 h-3 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-1"
                    />
                    <label
                      htmlFor="filter-toggle"
                      className="text-xs font-medium text-gray-700"
                    >
                      Filter
                    </label>
                  </div>
                )}

                {/* Pagination Toggle */}
                {onPaginationToggle && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pagination-toggle"
                      checked={withPagination}
                      onChange={(e) => onPaginationToggle(e.target.checked)}
                      className="w-3 h-3 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-1"
                    />
                    <label
                      htmlFor="pagination-toggle"
                      className="text-xs font-medium text-gray-700"
                    >
                      Pagination
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Senaryo Test Kontrolleri */}
          <div className="border-t pt-2">
            <h4 className="font-medium text-gray-900 mb-2 text-xs">
              Senaryo Testleri:
            </h4>
            <div className="space-y-2">
              {/* Loading Toggle */}
              {onLoadingToggle && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="loading-toggle"
                      checked={loading}
                      onChange={(e) => onLoadingToggle(e.target.checked)}
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                    />
                    <label
                      htmlFor="loading-toggle"
                      className="text-xs font-medium text-gray-700"
                    >
                      Loading
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">
                    {loading ? "ON" : "OFF"}
                  </span>
                </div>
              )}

              {/* No Data Toggle */}
              {onNoDataToggle && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="nodata-toggle"
                      checked={showNoData}
                      onChange={(e) => onNoDataToggle(e.target.checked)}
                      className="w-3 h-3 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-1"
                    />
                    <label
                      htmlFor="nodata-toggle"
                      className="text-xs font-medium text-gray-700"
                    >
                      No Data
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">
                    {showNoData ? "ON" : "OFF"}
                  </span>
                </div>
              )}

              {/* Delayed Loading Tests */}
              {onDelayedLoadingTest && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">
                    Geciktirmeli:
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => onDelayedLoadingTest(2)}
                      className="px-1.5 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    >
                      2s
                    </button>
                    <button
                      onClick={() => onDelayedLoadingTest(5)}
                      className="px-1.5 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                    >
                      5s
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Test Buttons */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">
                  Hızlı Testler:
                </label>

                {onErrorTest && (
                  <button
                    onClick={onErrorTest}
                    className="w-full px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                  >
                    ❌ Error
                  </button>
                )}

                <button
                  onClick={() => {
                    onPageSizeChange(1);
                    onTotalRowsChange(1);
                  }}
                  className="w-full px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
                >
                  🔵 Minimal (1)
                </button>

                <button
                  onClick={() => {
                    onPageSizeChange(5);
                    onTotalRowsChange(1000);
                  }}
                  className="w-full px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                >
                  🚀 Perf (1000)
                </button>
              </div>
            </div>
          </div>

          {/* Mevcut Ayarlar */}
          <div className="border-t pt-2">
            <h4 className="font-medium text-gray-900 mb-1 text-xs">Ayarlar:</h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div className="bg-gray-50 p-1 rounded">
                <span className="font-medium">Size:</span> {pageSize}
              </div>
              <div className="bg-gray-50 p-1 rounded">
                <span className="font-medium">Total:</span> {totalRows}
              </div>
              <div className="bg-gray-50 p-1 rounded">
                <span className="font-medium">Show:</span>{" "}
                {Math.min(pageSize, totalRows)}
              </div>
              <div className="bg-gray-50 p-1 rounded">
                <span className="font-medium">F:</span>{" "}
                {withFilter ? "ON" : "OFF"}
              </div>
            </div>
          </div>

          {/* Senaryo Bilgisi */}
          <div className="border-t pt-2">
            <div className="text-xs text-gray-600">
              {pageSize > totalRows && (
                <div className="bg-blue-50 p-1.5 rounded text-blue-700">
                  📊 Az Veri ({pageSize}&gt;{totalRows})
                </div>
              )}
              {pageSize === totalRows && (
                <div className="bg-green-50 p-1.5 rounded text-green-700">
                  ⚖️ Tam Sayfa ({totalRows})
                </div>
              )}
              {pageSize < totalRows && (
                <div className="bg-orange-50 p-1.5 rounded text-orange-700">
                  📜 Scroll ({pageSize}/{totalRows})
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
