import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { catalogKeys } from "./catalog.keys";
import { fetchCatalog, searchCatalog } from "./catalog.service";
import type { CatalogFilters } from "./catalog.types";
import type { TmdbDiscoverMovieResponse } from "~/lib/tmdb/tmdb.types";

function getNextPageParam(lastPage: TmdbDiscoverMovieResponse) {
  return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
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
