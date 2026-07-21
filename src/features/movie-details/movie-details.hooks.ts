import { useQuery } from "@tanstack/react-query";
import { movieDetailsKeys } from "./movie-details.keys";
import { fetchMovieDetails } from "./movie-details.service";

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: movieDetailsKeys.detail(movieId),
    queryFn: () => fetchMovieDetails(movieId),
    staleTime: Infinity,
  });
}
