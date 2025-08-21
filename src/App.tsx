import React from "react";
import TableSim from "./components/TableSim";

export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Responsive Table Simulation</h1>

      {/* Az veri (scroll yok) */}
      <section className="space-y-2">
        <h2 className="font-medium">Az veri (pageSize=5, totalRows=5)</h2>
        <TableSim pageSize={5} totalRows={5} withFilter withPagination />
      </section>

      {/* Çok veri (yalnız Body scroll) */}
      <section className="space-y-2">
        <h2 className="font-medium">Çok veri (pageSize=100, totalRows=200)</h2>
        <TableSim pageSize={100} totalRows={200} withFilter withPagination />
      </section>

      {/* Pagination yok — alt çizgi son satır */}
      <section className="space-y-2">
        <h2 className="font-medium">Pagination yok (alt çizgi son satır)</h2>
        <TableSim
          pageSize={50}
          totalRows={120}
          withFilter={false}
          withPagination={false}
        />
      </section>
    </div>
  );
}
