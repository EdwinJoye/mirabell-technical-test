import { useQuery } from "@tanstack/react-query";
import { genresKeys } from "./genres.keys";
import { fetchGenres } from "./genres.service";

export function useGenres() {
  return useQuery({
    queryKey: genresKeys.list(),
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
}
