import { useQueries, useQuery } from "@tanstack/react-query";
import { movieDetailsKeys } from "./movie-details.keys";
import { fetchMovieDetails } from "./movie-details.service";

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: movieDetailsKeys.detail(movieId),
    queryFn: () => fetchMovieDetails(movieId),
    staleTime: Infinity,
  });
}

export function useMoviesDetails(movieIds: number[]) {
  return useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: movieDetailsKeys.detail(movieId),
      queryFn: () => fetchMovieDetails(movieId),
      staleTime: Infinity,
    })),
    combine: (results) => ({
      data: results.map((result) => result.data),
      isLoading: results.some((result) => result.isLoading),
    }),
  });
}
