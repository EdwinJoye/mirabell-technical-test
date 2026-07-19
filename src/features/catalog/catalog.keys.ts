import type { CatalogFilters } from "./catalog.types";

export const catalogKeys = {
  all: ["catalog"] as const,
  lists: () => [...catalogKeys.all, "list"] as const,
  list: (filters: CatalogFilters) => [...catalogKeys.lists(), filters] as const,
};
