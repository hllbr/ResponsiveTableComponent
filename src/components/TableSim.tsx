import React from "react";
import { useMeasureLayout } from "../hooks/useMeasureLayout";

interface RowContent {
  device: string;
  owner: string;
  status: string;
  className: string;
  hasExtraContent: boolean;
  extraDevice?: string;
  extraOwner?: string;
  extraStatus?: string;
}

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
  className = "",
}: Props) {
  const {
    containerRef,
    headerRef,
    filterRef,
    paginationRef,
    scrollAreaRef,
    theadRef,
    tbodyRef,
  } = useMeasureLayout();

  const visibleRows = Math.min(pageSize, totalRows);
  const rows = Array.from({ length: visibleRows }, (_, i) => i + 1);

  // Otomatik yükseklik kararı için içerik analizi
  const analyzeContentComplexity = (
    sampleSize: number = 10
  ): "fixed" | "intelligent" | "variable" => {
    const sampleRows = Math.min(sampleSize, visibleRows);
    let totalVariance = 0;
    let hasLongContent = false;
    let hasVariableContent = false;

    for (let i = 1; i <= sampleRows; i++) {
      const content = generateSampleContent(i);
      const textLength =
        content.device.length + content.owner.length + content.status.length;

      // Uzun içerik kontrolü (60+ karakter toplam)
      if (textLength > 60) hasLongContent = true;

      // Değişken içerik kontrolü (birden fazla satır gerektirebilir)
      if (content.device.length > 25 || content.status.length > 20)
        hasVariableContent = true;

      totalVariance += textLength;
    }

    const averageLength = totalVariance / sampleRows;
    const isHighVariance = totalVariance > sampleRows * 50; // Ortalama 50+ karakter

    // Karar algoritması
    if (!hasLongContent && !hasVariableContent && averageLength < 40) {
      return "fixed"; // Kısa, tutarlı içerik -> Fixed height
    } else if (hasLongContent && isHighVariance) {
      return "variable"; // Çok uzun ve değişken -> Variable height
    } else {
      return "intelligent"; // Orta seviye -> Intelligent height
    }
  };

  // Uniform (kısa) veri oluşturucu - fixed mode tetiklemek için
  const generateUniformContent = (rowNum: number): RowContent => {
    const shortDevices = ["iPhone", "iPad", "MacBook", "iMac", "Watch"];
    const shortOwners = ["John D.", "Sarah W.", "Mike", "Lisa", "Tom"];
    const shortStatuses = ["Active", "Idle", "Online", "Offline", "Ready"];

    return {
      device: shortDevices[rowNum % shortDevices.length],
      owner: shortOwners[rowNum % shortOwners.length],
      status: shortStatuses[rowNum % shortStatuses.length],
      className: rowNum % 2 === 0 ? "bg-slate-50" : "bg-white",
      hasExtraContent: false,
    };
  };

  // Örnek içerik oluşturucu (analiz için)
  const generateSampleContent = (rowNum: number): RowContent => {
    // className'e göre hangi veri tipini kullanacağını belirle
    if (className?.includes("uniform-data-demo")) {
      return generateUniformContent(rowNum);
    }

    // Bu fonksiyon real API'den gelen veri yapısını simüle eder
    const devices = [
      "iPhone 14",
      "MacBook Pro M2 16-inch with Advanced Display Technology",
      "iPad",
      "Samsung Galaxy Tab S8 Ultra with Advanced Productivity Suite and S Pen Support",
    ];
    const owners = [
      "John D.",
      "Sarah Wilson - Senior Software Engineer",
      "Mike",
      "Jennifer Lee - UX/UI Designer & Research Lead at Technology Division",
    ];
    const statuses = [
      "Active",
      "In Development Environment - Testing Phase with Quality Assurance",
      "Offline",
      "Critical Issue - Requires Immediate Attention from Support Team and Management",
    ];

    return {
      device: devices[rowNum % devices.length],
      owner: owners[rowNum % owners.length],
      status: statuses[rowNum % statuses.length],
      className: "",
      hasExtraContent: false,
    };
  };

  // Her zaman otomatik karar ver - hiç prop gerekmez!
  const effectiveMode: "fixed" | "intelligent" | "variable" =
    visibleRows > 0 ? analyzeContentComplexity() : "intelligent";

  // Simulates realistic API data with varying content lengths
  const generateRealisticContent = (rowNum: number): RowContent => {
    const devices = [
      `MacBook Pro M2`,
      `Dell XPS 13 Developer Edition`,
      `Surface Laptop Studio`,
      `ThinkPad X1 Carbon Gen 10`,
      `iPhone 14 Pro Max`,
      `Samsung Galaxy Tab S8 Ultra with Advanced Productivity Suite`,
      `iPad Pro 12.9" with Magic Keyboard and Apple Pencil (2nd Generation)`,
      `ASUS ROG Zephyrus G14 Gaming Laptop`,
      `HP Spectre x360`,
      `Lenovo Yoga 9i`,
    ];

    const owners = [
      `John D.`,
      `Sarah Wilson`,
      `Alex Chen - Senior Developer`,
      `Maria Garcia (Software Architect)`,
      `David Thompson - Product Manager`,
      `Jennifer Lee - UX/UI Designer & Research Lead`,
      `Michael Brown - DevOps Engineer`,
      `Lisa Wang`,
      `Robert Davis - Senior Backend Developer`,
      `Emily Rodriguez - Full Stack Developer & Team Lead`,
    ];

    const statuses = [
      `Active`,
      `Maintenance`,
      `In Development Environment - Testing Phase`,
      `Deployed to Production - Monitoring Required`,
      `Pending Review`,
      `Critical Issue - Requires Immediate Attention from Support Team`,
      `Offline`,
      `Configuration Update in Progress`,
      `Security Patch Installation - Scheduled Maintenance Window`,
      `Performance Optimization Required`,
    ];

    const deviceIndex = rowNum % devices.length;
    const ownerIndex = rowNum % owners.length;
    const statusIndex = rowNum % statuses.length;

    return {
      device: devices[deviceIndex],
      owner: owners[ownerIndex],
      status: statuses[statusIndex],
      className: rowNum % 2 === 0 ? "bg-slate-50" : "bg-white",
      hasExtraContent: false,
    };
  };

  // Function to generate content for demonstration
  const getRowContent = (rowNum: number): RowContent => {
    // className'e göre özel veri tipi kullan - bu her zaman öncelik alır
    if (className?.includes("uniform-data-demo")) {
      return generateUniformContent(rowNum);
    }

    // smart-auto-height-demo için realistic data kullan
    if (className?.includes("smart-auto-height-demo")) {
      return generateRealisticContent(rowNum);
    }

    // Otomatik mod veya manuel mod seçimine göre içerik oluştur
    if (effectiveMode === "intelligent") {
      // Intelligent height - realistic API-like data with varying lengths
      return generateRealisticContent(rowNum);
    } else if (effectiveMode === "fixed") {
      // Fixed height rows - consistent content
      const statusOptions = ["Active", "Idle", "Online", "Offline"];
      const status = statusOptions[rowNum % statusOptions.length];
      return {
        device: `Device #${rowNum}`,
        owner: `User ${rowNum}`,
        status: status,
        className: rowNum % 2 === 0 ? "bg-slate-50" : "bg-white",
        hasExtraContent: false,
      };
    } else {
      // Variable height rows - different content sizes
      const type = rowNum % 4;
      switch (type) {
        case 0:
          return {
            device: `Device #${rowNum}`,
            owner: `User ${rowNum}`,
            status: rowNum % 2 ? "Active" : "Idle",
            className: "odd:bg-cyan-50 even:bg-cyan-100",
            hasExtraContent: false,
          };
        case 1:
          return {
            device: `Complex Device #${rowNum} with Long Name`,
            owner: `Administrator ${rowNum} (Senior Level)`,
            status: rowNum % 2 ? "Maintenance Required" : "Online",
            className: "odd:bg-blue-50 even:bg-blue-100",
            hasExtraContent: true,
            extraDevice: `Last updated: ${new Date().toLocaleDateString()}`,
            extraOwner: "Department: Engineering",
          };
        case 2:
          return {
            device: `Device #${rowNum}`,
            owner: `User ${rowNum}`,
            status: "Pending Review",
            className: "odd:bg-green-50 even:bg-green-100",
            hasExtraContent: false,
          };
        case 3:
          return {
            device: `Advanced Device #${rowNum} - Enterprise Edition`,
            owner: `System Administrator ${rowNum} (Level 3)`,
            status: "Critical Alert - Requires Immediate Attention",
            className: "odd:bg-red-50 even:bg-red-100",
            hasExtraContent: true,
            extraStatus: "Priority: High",
          };
        default:
          return {
            device: `Device #${rowNum}`,
            owner: `User ${rowNum}`,
            status: "Unknown",
            className: "odd:bg-gray-50 even:bg-gray-100",
            hasExtraContent: false,
          };
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden rounded border shadow-sm bg-white h-full ${className}`}
    >
      {/* Otomatik mod bilgisi - her zaman göster */}
      <div className="bg-slate-100 px-3 py-2 text-xs text-slate-600 border-b">
        🤖 <strong>Auto-Detected:</strong>{" "}
        <span className="font-mono bg-slate-200 px-1 rounded">
          {effectiveMode}
        </span>{" "}
        height
        {effectiveMode === "fixed" && " (short & consistent content)"}
        {effectiveMode === "intelligent" && " (medium variable content)"}
        {effectiveMode === "variable" && " (long & highly variable content)"}
      </div>
      {/* Üst Bölüm: Header + Titles + Filter — scroll DIŞINDA, sabit */}
      <div className="flex-shrink-0">
        {/* Header */}
        <div ref={headerRef} className="px-3 py-2 text-white bg-indigo-600">
          header
        </div>

        {/* Table Headers */}
        <div ref={theadRef} className="bg-purple-200 border-b">
          <div className="grid grid-cols-3 gap-0">
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Device
            </div>
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Owner
            </div>
            <div className="text-left px-3 py-2 font-medium text-purple-900">
              Status
            </div>
          </div>
        </div>

        {/* Filter */}
        {withFilter && (
          <div ref={filterRef} className="px-3 py-2 text-white bg-emerald-600">
            filter
          </div>
        )}
      </div>

      {/* Orta Bölüm: Scroll alanı - SADECE tablo verisi (tbody) */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto overflow-x-auto overscroll-contain min-h-0"
      >
        {/* Sadece Table Body */}
        <div className="w-full">
          {loading ? (
            <div className="px-3 py-8 text-center text-slate-500">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="px-3 py-12 text-center text-slate-500">No Data</div>
          ) : (
            <div ref={tbodyRef} className="w-full">
              {rows.map((n) => {
                const content = getRowContent(n);
                return (
                  <div
                    key={n}
                    className={`grid grid-cols-3 gap-0 border-b ${
                      content.className
                    } ${
                      effectiveMode === "fixed"
                        ? "h-14"
                        : effectiveMode === "intelligent"
                        ? "min-h-[3.5rem]"
                        : ""
                    }`}
                  >
                    <div
                      className={`px-3 py-3 ${
                        effectiveMode === "fixed"
                          ? "py-4 flex items-center"
                          : effectiveMode === "intelligent"
                          ? "flex items-start"
                          : ""
                      }`}
                    >
                      <div
                        className={
                          effectiveMode === "intelligent" ? "w-full" : ""
                        }
                      >
                        <div
                          className={`font-medium ${
                            effectiveMode === "intelligent"
                              ? "break-words leading-tight"
                              : ""
                          }`}
                        >
                          {content.device}
                        </div>
                        {content.hasExtraContent &&
                          content.extraDevice &&
                          effectiveMode !== "intelligent" && (
                            <div className="text-xs text-gray-500 mt-1">
                              {content.extraDevice}
                            </div>
                          )}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-3 ${
                        effectiveMode === "fixed"
                          ? "py-4 flex items-center"
                          : effectiveMode === "intelligent"
                          ? "flex items-start"
                          : ""
                      }`}
                    >
                      <div
                        className={
                          effectiveMode === "intelligent" ? "w-full" : ""
                        }
                      >
                        <div
                          className={
                            effectiveMode === "intelligent"
                              ? "break-words leading-tight"
                              : ""
                          }
                        >
                          {content.owner}
                        </div>
                        {content.hasExtraContent &&
                          content.extraOwner &&
                          effectiveMode !== "intelligent" && (
                            <div className="text-xs text-gray-500 mt-1">
                              {content.extraOwner}
                            </div>
                          )}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-3 ${
                        effectiveMode === "fixed"
                          ? "py-4 flex items-center"
                          : effectiveMode === "intelligent"
                          ? "flex items-start"
                          : ""
                      }`}
                    >
                      <div
                        className={
                          effectiveMode === "intelligent" ? "w-full" : ""
                        }
                      >
                        <div
                          className={`flex items-center gap-2 ${
                            effectiveMode === "intelligent" ? "items-start" : ""
                          }`}
                        >
                          <span
                            className={
                              effectiveMode === "intelligent"
                                ? "break-words leading-tight text-sm"
                                : ""
                            }
                          >
                            {content.status}
                          </span>
                          {content.hasExtraContent &&
                            content.extraStatus &&
                            effectiveMode === "variable" && (
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            )}
                        </div>
                        {content.hasExtraContent &&
                          content.extraStatus &&
                          effectiveMode === "variable" && (
                            <div className="text-xs text-red-600 mt-1">
                              {content.extraStatus}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Alt Bölüm: Pagination — scroll alanının DIŞINDA */}
      {withPagination && (
        <div
          ref={paginationRef}
          className="flex-shrink-0 bg-orange-500 text-black px-3 py-2 border-t flex items-center justify-between"
        >
          <div className="text-sm">
            Showing {Math.min(pageSize, totalRows)} of {totalRows} entries
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50">
              ‹ Prev
            </button>
            <span className="text-sm">
              Page 1 of {Math.ceil(totalRows / pageSize)}
            </span>
            <button className="px-2 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50">
              Next ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
