import React from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function UniformDataExample() {
  const location = useLocation();
  const { getCurrentPageData } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  return (
    <div className="h-screen overflow-hidden flex flex-col p-6">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          📏 Uniform Data Example - Fixed Height Demo
        </h1>
        <p className="text-gray-600 mt-2">
          Bu örnekte kısa ve tutarlı veriler kullanılır. Sistem otomatik olarak
          bunu analiz edip "fixed" height modunu seçer (56px sabit yükseklik).
        </p>

        <div className="mt-3 space-y-3">
          <div className="text-sm bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <strong className="text-blue-800">📊 Veri Özellikleri:</strong>
            <div className="text-blue-700 mt-1">
              • Kısa cihaz isimleri (iPhone, iPad vs.)
              <br />
              • Kısa kullanıcı isimleri (John D., Mike vs.)
              <br />
              • Tek kelime status'lar (Active, Idle vs.)
              <br />• Toplam &lt; 40 karakter per satır
            </div>
          </div>

          <div className="text-sm bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
            <strong className="text-green-800">🎯 Beklenen Sonuç:</strong>
            <div className="text-green-700 mt-1">
              Sistem otomatik "fixed" modu seçecek → Tüm satırlar 56px sabit
              yükseklik
            </div>
          </div>

          <div className="text-sm bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
            <strong className="text-amber-800">⚡ Performans:</strong>
            <div className="text-amber-700 mt-1">
              Fixed mode = En hızlı virtual scrolling performansı
            </div>
          </div>
        </div>
      </div>

      {/* Table with uniform short data */}
      <div className="flex-1 min-h-0 mt-6 flex flex-col h-full">
        <TableSim
          pageSize={currentData.pageSize}
          totalRows={currentData.showNoData ? 0 : currentData.totalRows}
          withFilter={currentData.withFilter}
          withPagination={currentData.withPagination}
          loading={currentData.loading}
          className="uniform-data-demo"
        />
      </div>
    </div>
  );
}
