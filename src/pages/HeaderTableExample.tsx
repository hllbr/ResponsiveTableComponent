import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function HeaderTableExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="h-full flex flex-col">
      {/* Header Area - Top Section */}
      <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-red-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Header + Table Layout
          </h1>
          <p className="text-gray-600 text-sm">
            Bu sayfa için özel ayarlar: PageSize: {currentData.pageSize}, Total:{" "}
            {currentData.totalRows}. Kontroller sidebar'da bulunur.
          </p>
        </div>
      </div>

      {/* Table Area - Bottom Section */}
      <div className="flex-1 min-h-0 p-4 flex flex-col">
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
