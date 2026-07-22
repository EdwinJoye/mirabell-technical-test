export type DashboardPeriod = "week" | "month" | "year";

export interface GlobalDashboardStats {
  period: DashboardPeriod;
  totalViews: number;
  previousPeriodViews: number;
  twoPeriodsAgoViews: number;
  growthRate: number;
  activeUsers: number;
  newUsers: number;
  totalWatchTimeMinutes: number;
}

export interface WatchTimePoint {
  date: string;
  totalWatchTimeMinutes: number;
}

export interface ActiveUsersPoint {
  date: string;
  activeUsers: number;
}

export interface TopWatchedMovie {
  tmdbMovieId: number;
  movieTitle: string;
  totalViews: number;
  uniqueViewers: number;
}

export interface GenrePopularity {
  genre: string;
  totalViews: number;
  totalWatchTimeMinutes: number;
}

export interface DeviceDistribution {
  deviceType: string;
  views: number;
  percentage: number;
}

export interface GlobalDashboardData {
  stats: GlobalDashboardStats;
  watchTimeOverTime: WatchTimePoint[];
  activeUsersOverTime: ActiveUsersPoint[];
  topWatchedMovies: TopWatchedMovie[];
  genrePopularity: GenrePopularity[];
  deviceDistribution: DeviceDistribution[];
}

export interface MovieDashboardStats {
  tmdbMovieId: number;
  title: string;
  totalViews: number;
  growthRate: number;
  uniqueViewers: number;
  averageWatchTimeMinutes: number;
}

export interface MovieViewsPoint {
  date: string;
  views: number;
}

export interface MovieCompletionRate {
  startedViews: number;
  completedViews: number;
  completionRate: number;
}

export interface MovieRatingDistributionEntry {
  rating: number;
  count: number;
}

export interface MovieDashboardData {
  stats: MovieDashboardStats;
  viewsEvolution: MovieViewsPoint[];
  completionRate: MovieCompletionRate;
  ratingDistribution: MovieRatingDistributionEntry[];
  deviceDistribution: DeviceDistribution[];
}
