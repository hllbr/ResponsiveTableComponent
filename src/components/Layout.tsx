import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTableContext } from "../contexts/TableContext";

export default function Layout() {
  const location = useLocation();
  const isFullPage = location.pathname === "/full-page";
  const isHeaderTable = location.pathname === "/header-table";

  const {
    getCurrentPageData,
    setPageSize,
    setTotalRows,
    setWithFilter,
    setWithPagination,
    setLoading,
    handleNoDataToggle,
    handleDelayedLoadingTest,
    handleErrorTest,
  } = useTableContext();

  // Get current page data
  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        currentPath={location.pathname}
        pageSize={currentData.pageSize}
        totalRows={currentData.totalRows}
        onPageSizeChange={(size) => setPageSize(location.pathname, size)}
        onTotalRowsChange={(total) => setTotalRows(location.pathname, total)}
        withFilter={currentData.withFilter}
        withPagination={currentData.withPagination}
        loading={currentData.loading}
        onFilterToggle={(enabled) => setWithFilter(location.pathname, enabled)}
        onPaginationToggle={(enabled) =>
          setWithPagination(location.pathname, enabled)
        }
        onLoadingToggle={(loading) => setLoading(location.pathname, loading)}
        showNoData={currentData.showNoData}
        onNoDataToggle={(enabled) =>
          handleNoDataToggle(location.pathname, enabled)
        }
        onDelayedLoadingTest={(delay) =>
          handleDelayedLoadingTest(location.pathname, delay)
        }
        onErrorTest={handleErrorTest}
      />
      <main className="flex-1 overflow-auto min-h-0">
        {isFullPage || isHeaderTable ? (
          <Outlet />
        ) : (
          <div className="p-6 max-w-5xl mx-auto min-h-0">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
}
