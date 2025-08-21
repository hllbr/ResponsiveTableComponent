📌 PROMPT (KODLAMA EDITÖRÜ İÇİN)

Rolün: Senior Frontend Engineer.
Hedef: “Responsive Table Simulation” adında uygulama tipi bir frontend MVP kur ve çalışır hale getir. Bu MVP, tek scroll konteyneri + sticky header/pagination + ResizeObserver + rAF ile dinamik yükseklik davranışını birebir simüle eder.
Stack (sabit): React 18.2, Vite 5, TypeScript, Tailwind 3.4, React Router 7.

0. Proje başlığı ve paketler

Proje klasörü: table-simülation

package.json aynen şu içerikte olsun (kullanıcının verdiği sürümler):

{
"name": "table-simülation",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"
},
"dependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^7.6.3"
},
"devDependencies": {
"@eslint/js": "^8.56.0",
"@types/react": "^18.3.23",
"@types/react-dom": "^18.3.7",
"@vitejs/plugin-react": "^4.2.1",
"autoprefixer": "^10.4.21",
"eslint": "^8.56.0",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.5",
"globals": "^13.24.0",
"postcss": "^8.5.6",
"tailwindcss": "^3.4.4",
"typescript": "^5.8.3",
"vite": "^5.0.8"
}
}

Not: React 18’de createRoot kullan. ReactDOM.render kullanma.
React
legacy.reactjs.org

1. Proje ağacını oluştur

Aşağıdaki dosya/klasörleri aynen oluştur ve içeriklerini birebir yaz:

responsivedevicemanagement/
├─ package.json (yukarıdaki)
├─ index.html
├─ tsconfig.json
├─ vite.config.ts
├─ postcss.config.cjs
├─ tailwind.config.cjs
└─ src/
├─ main.tsx
├─ index.css
├─ App.tsx
├─ hooks/
│ └─ useMeasureLayout.ts
└─ components/
└─ TableSim.tsx

index.html

<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Responsive Table Simulation</title>
  </head>
  <body class="bg-slate-50">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

Vite, kök index.html’i giriş olarak kullanır.
vitejs

tsconfig.json
{
"compilerOptions": {
"target": "ES2020",
"lib": ["ES2020", "DOM", "DOM.Iterable"],
"jsx": "react-jsx",
"module": "ESNext",
"moduleResolution": "Bundler",
"strict": true,
"skipLibCheck": true,
"baseUrl": ".",
"types": ["vite/client"]
},
"include": ["src"]
}

vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()]
});

postcss.config.cjs
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {}
}
};

tailwind.config.cjs
/** @type {import('tailwindcss').Config} \*/
module.exports = {
content: [
"./index.html",
"./src/**/\*.{ts,tsx}"
],
theme: { extend: {} },
plugins: []
};

Tailwind + Vite resmi rehbere uygun kurulum.
Tailwind CSS

2. Giriş noktası ve Router
   src/main.tsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import { createBrowserRouter, RouterProvider } from "react-router-dom";
   import "./index.css";
   import App from "./App";

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);

createRoot (React 18) ve createBrowserRouter (RR7) kullanımı.
React
React Router

src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: light; }

3. Dinamik yükseklik hook’u
   src/hooks/useMeasureLayout.ts
   import { useEffect, useRef } from "react";

/\*\*

- Measure-first yükseklik:
- available = containerH - headerH - filterH - footerH
- - scrollArea.height = available
- - overflows? paddingBottom = footerH : 0 (kısa tabloda boşluk bırakma)
- - rAF + ±1–2px eşik ile jitter azalt
    \*/
    export function useMeasureLayout() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const filterRef = useRef<HTMLDivElement | null>(null);
    const paginationRef = useRef<HTMLDivElement | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);
    const theadRef = useRef<HTMLTableSectionElement | null>(null);
    const tbodyRef = useRef<HTMLTableSectionElement | null>(null);

useEffect(() => {
const container = containerRef.current;
const header = headerRef.current;
const filter = filterRef.current;
const pagination = paginationRef.current;
const scrollArea = scrollAreaRef.current;
const thead = theadRef.current;
const tbody = tbodyRef.current;

    if (!container || !scrollArea) return;

    const applyLayout = () => {
      const Hc = container.clientHeight ?? 0;
      const Hh = header?.offsetHeight ?? 0;
      const Hf = filter?.offsetHeight ?? 0;
      const Hp = pagination?.offsetHeight ?? 0;

      const available = Math.max(0, Hc - Hh - Hf - Hp);

      // Height yaz (±1–2px eşik)
      if (Math.abs(scrollArea.offsetHeight - available) > 1) {
        scrollArea.style.height = `${available}px`;
        scrollArea.style.overflowY = "auto";
        scrollArea.style.overflowX = "auto";
      }

      // İçerik taşması var mı?
      const contentH = (thead?.offsetHeight ?? 0) + (tbody?.offsetHeight ?? 0);
      const clientH = scrollArea.clientHeight;
      const scrollH = Math.max(scrollArea.scrollHeight, contentH);
      const overflows = scrollH - clientH > 1;

      // Sticky bottom örtüşmesini önlemek için: sadece taşma varsa footer kadar ped
      scrollArea.style.paddingBottom = overflows && Hp ? `${Hp}px` : "0px";
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(applyLayout));
    ro.observe(container);
    header && ro.observe(header);
    filter && ro.observe(filter);
    pagination && ro.observe(pagination);
    ro.observe(scrollArea);

    const mo = new MutationObserver(() => requestAnimationFrame(applyLayout));
    mo.observe(scrollArea, { childList: true, subtree: true });

    requestAnimationFrame(applyLayout);
    const onWinResize = () => requestAnimationFrame(applyLayout);
    window.addEventListener("resize", onWinResize);

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onWinResize);
    };

}, []);

return {
containerRef,
headerRef,
filterRef,
paginationRef,
scrollAreaRef,
theadRef,
tbodyRef
};
}

ResizeObserver ile element boyut değişimini izleyip rAF içinde güncelle.
MDN Web Docs

4. Tablo simülasyonu
   src/components/TableSim.tsx
   import React from "react";
   import { useMeasureLayout } from "../hooks/useMeasureLayout";

type Props = {
withFilter?: boolean;
withPagination?: boolean;
pageSize: number; // 1..200
totalRows: number; // demo toplam
loading?: boolean;
className?: string;
};

export default function TableSim({
withFilter = true,
withPagination = true,
pageSize,
totalRows,
loading,
className = ""
}: Props) {
const {
containerRef,
headerRef,
filterRef,
paginationRef,
scrollAreaRef,
theadRef,
tbodyRef
} = useMeasureLayout();

const visibleRows = Math.min(pageSize, totalRows);
const rows = Array.from({ length: visibleRows }, (\_, i) => i + 1);

return (
<div
ref={containerRef}
className={`flex flex-col overflow-hidden rounded border shadow-sm h-[70vh] bg-white ${className}`} >
{/_ Tek scroll konteyneri _/}
<div
        ref={scrollAreaRef}
        className="flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-auto overscroll-contain"
      >
{/_ Header + Filter — sticky top (aynı scroll konteynerine göre) _/}
<div className="sticky top-0 z-10">
<div ref={headerRef} className="px-3 py-2 text-white bg-indigo-600">
header
</div>
{withFilter && (
<div ref={filterRef} className="px-3 py-2 text-white bg-emerald-600">
filter
</div>
)}
</div>

        {/* Table */}
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead ref={theadRef} className="bg-cyan-100">
            <tr className="border-b">
              <th className="text-left px-3 py-2">Device</th>
              <th className="text-left px-3 py-2">Owner</th>
              <th className="text-left px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef} className="align-top">
            {loading ? (
              <tr>
                <td className="px-3 py-8 text-center text-slate-500" colSpan={3}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-3 py-12 text-center text-slate-500" colSpan={3}>
                  No Data
                </td>
              </tr>
            ) : (
              rows.map((n) => (
                <tr key={n} className="odd:bg-cyan-50 even:bg-cyan-100 border-b">
                  <td className="px-3 py-3">Device #{n}</td>
                  <td className="px-3 py-3">User {n}</td>
                  <td className="px-3 py-3">{n % 2 ? "Active" : "Idle"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination — sticky bottom */}
        {withPagination && (
          <div
            ref={paginationRef}
            className="sticky bottom-0 z-10 bg-orange-500 text-black px-3 py-2 border-t"
          >
            pagination
          </div>
        )}
      </div>
    </div>

);
}

position: sticky top/bottom, bulunduğu scroll konteynerine göre çalışır; header/pagination aynı konteyner içinde olmalı.
MDN Web Docs

5. Uygulama kabuğu
   src/App.tsx
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
        <TableSim pageSize={50} totalRows={120} withFilter={false} withPagination={false} />
      </section>
    </div>

);
}
npm install
npm run dev
