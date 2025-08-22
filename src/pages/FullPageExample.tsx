import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function FullPageExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="min-h-screen flex justify-center px-6 py-6">
      <div className="max-w-4xl w-full min-h-0">
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
