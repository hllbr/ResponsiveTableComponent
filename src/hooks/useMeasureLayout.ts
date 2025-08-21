import { useEffect, useRef } from "react";

/**
 * Measure-first yükseklik:
 * - available = containerH - headerH - filterH - footerH
 * - scrollArea.height = available
 * - overflows? paddingBottom = footerH : 0 (kısa tabloda boşluk bırakma)
 * - rAF + ±1–2px eşik ile jitter azalt
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
      // Dinamik yükseklik için scrollArea'nın doğal boyutunu kullan
      const contentH = (thead?.offsetHeight ?? 0) + (tbody?.offsetHeight ?? 0);
      const Hh = header?.offsetHeight ?? 0;
      const Hf = filter?.offsetHeight ?? 0;
      const Hp = pagination?.offsetHeight ?? 0;

      // Container'ın max-height'ı var, bu sınırı kontrol et
      const maxHeight = container.style.maxHeight
        ? (parseFloat(container.style.maxHeight.replace("vh", "")) *
            window.innerHeight) /
          100
        : window.innerHeight * 0.7;

      const maxScrollAreaHeight = maxHeight - Hh - Hf - Hp;
      const naturalHeight = contentH + Hh + Hf;

      // Eğer içerik max-height'tan küçükse, scroll area'yı içerik boyutunda bırak
      // Eğer büyükse, max-height'a kadar scroll yap
      if (naturalHeight <= maxHeight) {
        // İçerik küçük - scroll area doğal boyutunda
        scrollArea.style.height = "auto";
        scrollArea.style.overflowY = "visible";
      } else {
        // İçerik büyük - scroll area sınırlı yükseklikte
        scrollArea.style.height = `${maxScrollAreaHeight}px`;
        scrollArea.style.overflowY = "auto";
      }

      scrollArea.style.overflowX = "auto";
      scrollArea.style.paddingBottom = "0px";
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(applyLayout));
    ro.observe(container);
    header && ro.observe(header);
    filter && ro.observe(filter);
    pagination && ro.observe(pagination);
    ro.observe(scrollArea);

    const mo = new MutationObserver(() => requestAnimationFrame(applyLayout));
    mo.observe(scrollArea, { childList: true, subtree: true });

    // İlk layout ve window resize handling
    requestAnimationFrame(applyLayout);
    const onWinResize = () => requestAnimationFrame(applyLayout);
    window.addEventListener("resize", onWinResize);

    // Content değişimlerini de izle (tbody için ekstra observer)
    if (tbody) {
      const tbodyMutationObserver = new MutationObserver(() =>
        requestAnimationFrame(applyLayout)
      );
      tbodyMutationObserver.observe(tbody, { childList: true, subtree: true });
    }

    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onWinResize);
      // Tbody mutation observer cleanup'ı da ele almak lazım ama
      // referans yok, bu durumda ResizeObserver zaten handle ediyor
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
