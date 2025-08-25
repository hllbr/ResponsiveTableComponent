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
          🤖 Smart Auto Height - Zero Configuration!
        </h1>
        <p className="text-gray-600 mt-2">
          Bu tablo tamamen otomatik çalışır! İçeriği analiz edip en uygun
          yükseklik modunu kendisi seçer. Yazılımcı hiçbir prop vermek zorunda
          değil. API'den ne gelirse gelsin, sistem optimize eder.
        </p>
        <div className="mt-3 text-sm bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
          <strong className="text-green-800">✨ Tamamen Otomatik:</strong>
          <div className="text-green-700 mt-1">
            • Kısa içerik → Fixed height (56px)
            <br />
            • Orta içerik → Intelligent height (min 56px + auto)
            <br />
            • Uzun içerik → Variable height (tam esnek)
            <br />• Üstteki yeşil bar hangi mod seçildiğini gösterir
          </div>
        </div>
      </div>

      {/* Table with automatic height detection */}
      <div className="flex-1 min-h-0 mt-6 flex flex-col h-full">
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
