import { fetchTmdb } from "~/lib/tmdb/tmdb.client";
import {
  tmdbDiscoverMovieResponseSchema,
  tmdbSearchMovieResponseSchema,
} from "~/lib/tmdb/tmdb.schemas";
import type { TmdbDiscoverMovieResponse, TmdbSearchMovieResponse } from "~/lib/tmdb/tmdb.types";
import type { CatalogFilters } from "./catalog.types";

function buildDiscoverMovieSearchParams(filters: CatalogFilters): URLSearchParams {
  const searchParams = new URLSearchParams({ page: String(filters.page) });

  if (filters.sortBy) {
    searchParams.set("sort_by", filters.sortBy);
  }

  if (filters.withGenres && filters.withGenres.length > 0) {
    searchParams.set("with_genres", filters.withGenres.join(","));
  }

  return searchParams;
}

export async function fetchCatalog(filters: CatalogFilters): Promise<TmdbDiscoverMovieResponse> {
  const searchParams = buildDiscoverMovieSearchParams(filters);
  const data = await fetchTmdb<unknown>(`/discover/movie?${searchParams.toString()}`);
  return tmdbDiscoverMovieResponseSchema.parse(data);
}

export async function searchCatalog(query: string, page: number): Promise<TmdbSearchMovieResponse> {
  const searchParams = new URLSearchParams({ query, page: String(page) });
  const data = await fetchTmdb<unknown>(`/search/movie?${searchParams.toString()}`);
  return tmdbSearchMovieResponseSchema.parse(data);
}
