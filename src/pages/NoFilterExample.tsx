import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function NoFilterExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="h-screen overflow-hidden flex flex-col p-6">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">Filter Olmadan</h1>
        <p className="text-gray-600 mt-2">
          Bu sayfa filter kapalı olarak başlar (PageSize: {currentData.pageSize}
          , Total: {currentData.totalRows}). Sidebar'dan filter
          açıp/kapatabilir, farklı kombinasyonları test edebilirsiniz.
        </p>
      </div>

      {/* Sadece Tablo - Tam genişlik */}
      <div className="flex-1 min-h-0 mt-6">
        <TableSim
          pageSize={currentData.pageSize}
          totalRows={currentData.showNoData ? 0 : currentData.totalRows}
          withFilter={currentData.withFilter}
          withPagination={currentData.withPagination}
          loading={currentData.loading}
        />
      </div>
    </div>
  );
}
