import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function NoPaginationExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Pagination Olmadan
        </h1>
        <p className="text-gray-600 mt-2">
          Bu sayfa pagination kapalı olarak başlar (PageSize:{" "}
          {currentData.pageSize}, Total: {currentData.totalRows}). Sidebar'dan
          farklı kombinasyonları test edebilir, scroll davranışını
          gözlemleyebilirsiniz.
        </p>
      </div>

      {/* Sadece Tablo - Tam genişlik */}
      <div className="min-h-0">
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
