import type { RouteObject } from "react-router";
import { MainLayout } from "~/layouts/MainLayout";
import { HomePage } from "~/pages/HomePage";
import { NotFoundPage } from "~/pages/NotFoundPage";

export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
