import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageData {
  pageSize: number;
  totalRows: number;
  withFilter: boolean;
  withPagination: boolean;
  loading: boolean;
  showNoData: boolean;
}

interface TableContextType {
  // Current page data
  getCurrentPageData: (path: string) => PageData;
  setCurrentPageData: (path: string, data: Partial<PageData>) => void;

  // Page-specific setters
  setPageSize: (path: string, size: number) => void;
  setTotalRows: (path: string, total: number) => void;
  setWithFilter: (path: string, enabled: boolean) => void;
  setWithPagination: (path: string, enabled: boolean) => void;
  setLoading: (path: string, loading: boolean) => void;
  setShowNoData: (path: string, enabled: boolean) => void;

  // Actions
  handleNoDataToggle: (path: string, enabled: boolean) => void;
  handleDelayedLoadingTest: (path: string, delaySeconds: number) => void;
  handleErrorTest: () => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function useTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
}

interface TableProviderProps {
  children: ReactNode;
}

// Default data for each page
const defaultPageData: Record<string, PageData> = {
  "/": {
    pageSize: 5,
    totalRows: 5,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/full-page": {
    pageSize: 20,
    totalRows: 1000,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/header-table": {
    pageSize: 10,
    totalRows: 100,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/large-data": {
    pageSize: 25,
    totalRows: 1000,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/no-pagination": {
    pageSize: 50,
    totalRows: 50,
    withFilter: true,
    withPagination: false,
    loading: false,
    showNoData: false,
  },
  "/loading": {
    pageSize: 10,
    totalRows: 20,
    withFilter: true,
    withPagination: true,
    loading: true,
    showNoData: false,
  },
  "/no-filter": {
    pageSize: 15,
    totalRows: 30,
    withFilter: false,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/variable-height": {
    pageSize: 25,
    totalRows: 100,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/uniform-data": {
    pageSize: 25,
    totalRows: 100,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/clean-uniform": {
    pageSize: 25,
    totalRows: 100,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
  "/clean-mixed": {
    pageSize: 25,
    totalRows: 150,
    withFilter: true,
    withPagination: true,
    loading: false,
    showNoData: false,
  },
};

export function TableProvider({ children }: TableProviderProps) {
  const [pagesData, setPagesData] =
    useState<Record<string, PageData>>(defaultPageData);

  const getCurrentPageData = (path: string): PageData => {
    return pagesData[path] || defaultPageData["/"];
  };

  const setCurrentPageData = (path: string, data: Partial<PageData>) => {
    setPagesData((prev) => ({
      ...prev,
      [path]: {
        ...prev[path],
        ...data,
      },
    }));
  };

  const setPageSize = (path: string, size: number) => {
    setCurrentPageData(path, { pageSize: size });
  };

  const setTotalRows = (path: string, total: number) => {
    setCurrentPageData(path, { totalRows: total });
  };

  const setWithFilter = (path: string, enabled: boolean) => {
    setCurrentPageData(path, { withFilter: enabled });
  };

  const setWithPagination = (path: string, enabled: boolean) => {
    setCurrentPageData(path, { withPagination: enabled });
  };

  const setLoading = (path: string, loading: boolean) => {
    setCurrentPageData(path, { loading });
  };

  const setShowNoData = (path: string, enabled: boolean) => {
    setCurrentPageData(path, { showNoData: enabled });
  };

  const handleNoDataToggle = (path: string, enabled: boolean) => {
    const currentData = getCurrentPageData(path);
    setCurrentPageData(path, {
      showNoData: enabled,
      totalRows: enabled ? 0 : defaultPageData[path]?.totalRows || 5,
    });
  };

  const handleDelayedLoadingTest = (path: string, delaySeconds: number) => {
    setLoading(path, true);
    setTimeout(() => {
      setLoading(path, false);
    }, delaySeconds * 1000);
  };

  const handleErrorTest = () => {
    alert(
      "Error senaryosu simüle edildi! Gerçek uygulamada burada error state gösterilir."
    );
  };

  const value: TableContextType = {
    getCurrentPageData,
    setCurrentPageData,
    setPageSize,
    setTotalRows,
    setWithFilter,
    setWithPagination,
    setLoading,
    setShowNoData,
    handleNoDataToggle,
    handleDelayedLoadingTest,
    handleErrorTest,
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}
