import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { catalogKeys } from "./catalog.keys";
import { fetchCatalog } from "./catalog.service";
import type { CatalogFilters } from "./catalog.types";

export function useCatalog(filters: CatalogFilters) {
  return useQuery({
    queryKey: catalogKeys.list(filters),
    queryFn: () => fetchCatalog(filters),
    placeholderData: keepPreviousData,
  });
}
