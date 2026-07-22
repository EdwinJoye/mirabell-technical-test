import { lazy } from "react";

export const HomePage = lazy(() =>
  import("~/pages/HomePage").then((module) => ({ default: module.HomePage })),
);
export const ExplorePage = lazy(() =>
  import("~/pages/ExplorePage").then((module) => ({ default: module.ExplorePage })),
);
export const DashboardPage = lazy(() =>
  import("~/pages/DashboardPage").then((module) => ({ default: module.DashboardPage })),
);
export const ComingSoonPage = lazy(() =>
  import("~/pages/ComingSoonPage").then((module) => ({ default: module.ComingSoonPage })),
);
