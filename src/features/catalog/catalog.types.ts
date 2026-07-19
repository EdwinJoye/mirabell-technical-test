export type CatalogSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "revenue.asc"
  | "revenue.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "original_title.asc"
  | "original_title.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc"
  | "title.asc"
  | "title.desc";

export interface CatalogFilters {
  page: number;
  sortBy?: CatalogSortBy;
  withGenres?: number[];
  withoutGenres?: number[];
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withOriginalLanguage?: string;
  includeAdult?: boolean;
}
