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

import NoFilterExample from "./pages/NoFilterExample";
import VariableHeightExample from "./pages/VariableHeightExample";
import UniformDataExample from "./pages/UniformDataExample";
import CleanUniformExample from "./pages/CleanUniformExample";
import CleanMixedExample from "./pages/CleanMixedExample";

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
        path: "/no-filter",
        element: <NoFilterExample />,
      },
      {
        path: "/variable-height",
        element: <VariableHeightExample />,
      },
      {
        path: "/uniform-data",
        element: <UniformDataExample />,
      },
      {
        path: "/clean-uniform",
        element: <CleanUniformExample />,
      },
      {
        path: "/clean-mixed",
        element: <CleanMixedExample />,
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
