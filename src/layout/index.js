import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "../components";
import Landing from "../containers/landing";

export default function MainLayout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Header />
          <Landing />
        </div>
      ),
    },
    {
      path: "/linear-graph",
      element: (
        <div>
          <Header />
          <Landing />
        </div>
      ),
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
