import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import { TableProvider } from "./contexts/TableContext";
import BasicExample from "./pages/BasicExample";
import FullPageExample from "./pages/FullPageExample";
import HeaderTableExample from "./pages/HeaderTableExample";
import LargeDataExample from "./pages/LargeDataExample";
import NoPaginationExample from "./pages/NoPaginationExample";
import LoadingExample from "./pages/LoadingExample";
import NoFilterExample from "./pages/NoFilterExample";
import VariableHeightExample from "./pages/VariableHeightExample";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BasicExample />,
      },
      {
        path: "/full-page",
        element: <FullPageExample />,
      },
      {
        path: "/header-table",
        element: <HeaderTableExample />,
      },
      {
        path: "/large-data",
        element: <LargeDataExample />,
      },
      {
        path: "/no-pagination",
        element: <NoPaginationExample />,
      },
      {
        path: "/loading",
        element: <LoadingExample />,
      },
      {
        path: "/no-filter",
        element: <NoFilterExample />,
      },
      {
        path: "/variable-height",
        element: <VariableHeightExample />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <TableProvider>
    <RouterProvider router={router} />
  </TableProvider>
);
