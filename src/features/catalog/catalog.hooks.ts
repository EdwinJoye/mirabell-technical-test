import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { catalogKeys } from "./catalog.keys";
import { fetchCatalog, searchCatalog } from "./catalog.service";
import type { CatalogFilters } from "./catalog.types";

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
