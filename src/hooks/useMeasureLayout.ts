import { useEffect, useRef } from "react";

/**
 * Viewport-based responsive table layout:
 * - Calculates available viewport height dynamically
 * - Only tbody scrolls when content overflows
 * - No gaps when content is short
 * - Smooth layout updates with RAF and thresholds
 */
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
      // 1. Fit-to-viewport calculation
      const rect = container.getBoundingClientRect();
      const availableViewport = Math.max(0, window.innerHeight - rect.top - 8);

      // Update container maxHeight if viewport changed significantly
      const currentMaxHeight =
        parseFloat(container.style.maxHeight || "0") || 0;
      if (Math.abs(currentMaxHeight - availableViewport) > 1) {
        container.style.maxHeight = `${availableViewport}px`;
      }

      // 2. Calculate component heights
      const Hh = header?.offsetHeight ?? 0;
      const Hf = filter?.offsetHeight ?? 0;
      const Hp = pagination?.offsetHeight ?? 0;

      // 3. Calculate content heights
      const theadHeight = thead?.offsetHeight ?? 0;
      const tbodyHeight = tbody?.offsetHeight ?? 0;
      const contentHeight = theadHeight + tbodyHeight;

      // 4. Calculate available scroll area height
      const maxScrollAreaHeight = availableViewport - Hh - Hf - Hp;
      const naturalHeight = contentHeight + Hh + Hf;

      // 5. Apply layout logic
      if (naturalHeight <= availableViewport) {
        // Short content: no scroll, no gaps
        scrollArea.style.height = "auto";
        scrollArea.style.overflowY = "visible";
        scrollArea.style.paddingBottom = "0px";
      } else {
        // Long content: scroll only tbody
        scrollArea.style.height = `${maxScrollAreaHeight}px`;
        scrollArea.style.overflowY = "auto";
        scrollArea.style.paddingBottom = "0px";
      }

      // Always enable horizontal scroll if needed
      scrollArea.style.overflowX = "auto";
    };

    // Create observers for all relevant elements
    const ro = new ResizeObserver(() => requestAnimationFrame(applyLayout));
    ro.observe(container);
    header && ro.observe(header);
    filter && ro.observe(filter);
    pagination && ro.observe(pagination);
    ro.observe(scrollArea);
    thead && ro.observe(thead);
    tbody && ro.observe(tbody);

    // Mutation observer for content changes
    const mo = new MutationObserver(() => requestAnimationFrame(applyLayout));
    mo.observe(scrollArea, { childList: true, subtree: true });

    if (tbody) {
      mo.observe(tbody, { childList: true, subtree: true });
    }

    // Initial layout and window resize handling
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
    tbodyRef,
  };
}
