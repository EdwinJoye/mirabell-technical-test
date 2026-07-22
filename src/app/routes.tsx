import type { RouteObject } from "react-router";
import { ComingSoonPage, DashboardPage, ExplorePage, HomePage } from "~/app/lazyPages";
import { MainLayout } from "~/layouts/MainLayout";

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
      {
        path: "*",
        element: <ComingSoonPage />,
      },
    ],
  },
];
