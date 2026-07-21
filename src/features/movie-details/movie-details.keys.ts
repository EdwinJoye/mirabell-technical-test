export const movieDetailsKeys = {
  all: ["movie-details"] as const,
  detail: (movieId: number) => [...movieDetailsKeys.all, movieId] as const,
};
