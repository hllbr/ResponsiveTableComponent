import { useEffect, useRef } from "react";

/**
 * Enhanced viewport-based responsive table layout:
 * - Calculates available viewport height dynamically
 * - Only tbody scrolls when content overflows
 * - No gaps when content is short (height: auto)
 * - Full-row snap when scrolling is needed
 * - Smooth layout updates with RAF and thresholds
 */
export function useMeasureLayout() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const theadRef = useRef<HTMLDivElement | null>(null);
  const tbodyRef = useRef<HTMLDivElement | null>(null);

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

      // 2. Calculate component heights
      const Hh = header?.offsetHeight ?? 0;
      const Hf = filter?.offsetHeight ?? 0;
      const Hp = pagination?.offsetHeight ?? 0;

      // 3. Calculate content heights
      const theadHeight = thead?.offsetHeight ?? 0;
      const tbodyHeight = tbody?.offsetHeight ?? 0;
      const contentHeight = theadHeight + tbodyHeight;

      // 4. Calculate natural height (all content without scroll)
      const naturalHeight = Hh + Hf + theadHeight + tbodyHeight + Hp;

      // Debug logging
      console.log("Layout Debug:", {
        availableViewport,
        naturalHeight,
        Hh,
        Hf,
        Hp,
        theadHeight,
        tbodyHeight,
        needsScroll: naturalHeight > availableViewport,
      });

      // 5. Apply layout logic
      if (naturalHeight <= availableViewport) {
        // Short content: no scroll, no gaps, extend to fit viewport
        container.style.height = "auto";
        scrollArea.style.height = "auto";
        scrollArea.style.overflowY = "visible";
        scrollArea.style.paddingBottom = "0px";
        console.log("Layout: Short content - no scroll needed");
      } else {
        // Long content: scroll only tbody with full-row snap
        container.style.height = `${availableViewport}px`;

        // Calculate max body height for scrolling
        const maxBodyHeight = availableViewport - Hh - Hf - Hp - theadHeight;

        // Full-row snap: find how many complete rows fit
        let visibleRowsHeight = 0;
        let visibleRowCount = 0;

        if (tbody && maxBodyHeight > 0) {
          // Get all row divs (direct children of tbody)
          const rows = Array.from(tbody.children) as HTMLElement[];

          for (const row of rows) {
            const rowHeight = row.offsetHeight;
            if (visibleRowsHeight + rowHeight <= maxBodyHeight + 1) {
              visibleRowsHeight += rowHeight;
              visibleRowCount++;
            } else {
              break;
            }
          }
        }

        // Apply snapped height if we have visible rows
        if (visibleRowCount > 0 && visibleRowsHeight > 0) {
          scrollArea.style.height = `${theadHeight + visibleRowsHeight}px`;
          console.log("Layout: Full-row snap applied", {
            visibleRowCount,
            visibleRowsHeight,
            snappedHeight: theadHeight + visibleRowsHeight,
          });
        } else {
          scrollArea.style.height = `${maxBodyHeight}px`;
          console.log("Layout: Standard scroll height", { maxBodyHeight });
        }

        scrollArea.style.overflowY = "auto";

        // Remove padding bottom - it causes unnecessary empty space
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
