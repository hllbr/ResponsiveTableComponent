import React, { useEffect } from "react";
import TableSim from "../components/TableSim";
import { useTableContext } from "../contexts/TableContext";
import { useLocation } from "react-router-dom";

export default function LoadingExample() {
  const location = useLocation();
  const { getCurrentPageData, setLoading } = useTableContext();

  const currentData = getCurrentPageData(location.pathname);

  useEffect(() => {
    // Set initial loading state for this page
    if (!currentData.loading) {
      setLoading(location.pathname, true);
      const timer = setTimeout(() => {
        setLoading(location.pathname, false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleReload = () => {
    setLoading(location.pathname, true);
    setTimeout(() => {
      setLoading(location.pathname, false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Loading Durumu</h1>
        <p className="text-gray-600 mt-2">
          Veri yüklenirken gösterilen loading durumu örneği (PageSize:{" "}
          {currentData.pageSize}, Total: {currentData.totalRows}). Farklı veri
          boyutları ve bileşen kombinasyonları ile loading davranışını test
          edebilirsiniz. Kontroller sidebar'da bulunur.
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg border mb-6">
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Yeniden Yükle (2 saniye loading)
        </button>
        <p className="text-sm text-gray-600 mt-2">
          İlk yükleme 3 saniye, manuel yükleme 2 saniye sürer.
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
