import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function BasicExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Temel Örnek</h1>
        <p className="text-gray-600 mt-2">
          Temel tablo örneği (PageSize: {currentData.pageSize}, Total:{" "}
          {currentData.totalRows}). Farklı veri boyutları, filter ve pagination
          kombinasyonları ile test edebilirsiniz. Kontroller sidebar'da bulunur.
        </p>
      </div>

      {/* Sadece Tablo - Tam genişlik */}
      <div>
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
