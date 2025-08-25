import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function CleanMixedExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="h-screen overflow-hidden flex flex-col p-6">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Clean Mixed Data
        </h1>
      </div>

      {/* Clean table - no explanations */}
      <div className="flex-1 min-h-0 flex flex-col h-full">
        <TableSim
          pageSize={currentData.pageSize}
          totalRows={currentData.showNoData ? 0 : currentData.totalRows}
          withFilter={currentData.withFilter}
          withPagination={currentData.withPagination}
          loading={currentData.loading}
          className="smart-auto-height-demo"
        />
      </div>
    </div>
  );
}
