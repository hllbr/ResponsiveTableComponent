import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function VariableHeightExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="h-screen overflow-hidden flex flex-col p-6">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          Variable Row Heights Example
        </h1>
        <p className="text-gray-600 mt-2">
          Test the table with variable row heights including images, long text,
          and different content sizes. This demonstrates the full-row snap
          functionality when scrolling is needed.
        </p>
      </div>

      {/* Table with variable heights */}
      <div className="flex-1 min-h-0 mt-6">
        <TableSim
          pageSize={currentData.pageSize}
          totalRows={currentData.showNoData ? 0 : currentData.totalRows}
          withFilter={currentData.withFilter}
          withPagination={currentData.withPagination}
          loading={currentData.loading}
          className="variable-height-demo"
        />
      </div>
    </div>
  );
}
