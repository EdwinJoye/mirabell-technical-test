import { keepPreviousData, useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { catalogKeys } from "./catalog.keys";
import { fetchCatalog, searchCatalog } from "./catalog.service";
import type { CatalogFilters } from "./catalog.types";
import type { TmdbDiscoverMovieResponse, TmdbMovie } from "~/lib/tmdb/tmdb.types";

const MAX_INFINITE_SCROLL_PAGES = 10;

function getNextPageParam(lastPage: TmdbDiscoverMovieResponse) {
  const lastPageToFetch = Math.min(lastPage.total_pages, MAX_INFINITE_SCROLL_PAGES);
  return lastPage.page < lastPageToFetch ? lastPage.page + 1 : undefined;
}

type CatalogPagesResult = {
  movies: TmdbMovie[];
  isLoading: boolean;
  isError: boolean;
};

export function useCatalogPages(filters: CatalogFilters, enabled = true): CatalogPagesResult {
  return useQueries({
    queries: Array.from({ length: MAX_INFINITE_SCROLL_PAGES }, (_, index) => {
      const page = index + 1;
      return {
        queryKey: catalogKeys.list({ ...filters, page }),
        queryFn: () => fetchCatalog({ ...filters, page }),
        enabled,
      };
    }),
    combine: (results) => ({
      movies: results.flatMap((result) => result.data?.results ?? []),
      isLoading: results.some((result) => result.isLoading),
      isError: results.some((result) => result.isError),
    }),
  });
}

export function useCatalogSearchPages(query: string, enabled = true): CatalogPagesResult {
  const isSearching = enabled && query.trim().length > 0;

  return useQueries({
    queries: Array.from({ length: MAX_INFINITE_SCROLL_PAGES }, (_, index) => {
      const page = index + 1;
      return {
        queryKey: catalogKeys.search(query, page),
        queryFn: () => searchCatalog(query, page),
        enabled: isSearching,
      };
    }),
    combine: (results) => ({
      movies: results.flatMap((result) => result.data?.results ?? []),
      isLoading: isSearching && results.some((result) => result.isLoading),
      isError: results.some((result) => result.isError),
    }),
  });
}

export function useCatalog(filters: CatalogFilters, enabled = true) {
  return useQuery({
    queryKey: catalogKeys.list(filters),
    queryFn: () => fetchCatalog(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useCatalogSearch(query: string, page: number, enabled = true) {
  return useQuery({
    queryKey: catalogKeys.search(query, page),
    queryFn: () => searchCatalog(query, page),
    placeholderData: keepPreviousData,
    enabled: enabled && query.trim().length > 0,
  });
}

export function useInfiniteCatalog(filters: CatalogFilters, enabled = true) {
  return useInfiniteQuery({
    queryKey: catalogKeys.infiniteList(filters),
    queryFn: ({ pageParam }) => fetchCatalog({ ...filters, page: pageParam }),
    initialPageParam: filters.page,
    getNextPageParam,
    enabled,
  });
}

export function useInfiniteCatalogSearch(query: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: catalogKeys.infiniteSearch(query),
    queryFn: ({ pageParam }) => searchCatalog(query, pageParam),
    initialPageParam: 1,
    getNextPageParam,
    enabled: enabled && query.trim().length > 0,
  });
}
