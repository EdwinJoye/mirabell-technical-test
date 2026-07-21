import type { RouteObject } from "react-router";
import { MainLayout } from "~/layouts/MainLayout";
import { ComingSoonPage } from "~/pages/ComingSoonPage";
import { DashboardPage } from "~/pages/DashboardPage";
import { ExplorePage } from "~/pages/ExplorePage";
import { HomePage } from "~/pages/HomePage";

export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ComingSoonPage />,
  },
];
