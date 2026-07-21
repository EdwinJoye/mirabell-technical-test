import globalDashboardData from "./dashboard-global.data.json";
import movieDashboardData from "./dashboard-movie.data.json";
import type { GlobalDashboardData, MovieDashboardData } from "./dashboard.types";

export function getGlobalDashboardData(): GlobalDashboardData {
  return globalDashboardData as GlobalDashboardData;
}

export function getMovieDashboardData(tmdbMovieId: number): MovieDashboardData | undefined {
  return (movieDashboardData as Record<number, MovieDashboardData>)[tmdbMovieId];
}

export function getAvailableMovieIds(): number[] {
  return Object.keys(movieDashboardData).map(Number);
}
