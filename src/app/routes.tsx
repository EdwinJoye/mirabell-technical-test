import type { RouteObject } from "react-router";
import { HomePage } from "~/pages/HomePage";
import { NotFoundPage } from "~/pages/NotFoundPage";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
