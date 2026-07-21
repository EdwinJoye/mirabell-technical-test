import { fetchTmdb } from "~/lib/tmdb/tmdb.client";
import { tmdbMovieDetailsSchema } from "~/lib/tmdb/tmdb.schemas";
import type { TmdbMovieDetails } from "~/lib/tmdb/tmdb.types";

export async function fetchMovieDetails(movieId: number): Promise<TmdbMovieDetails> {
  const data = await fetchTmdb<unknown>(`/movie/${movieId}`);
  return tmdbMovieDetailsSchema.parse(data);
}
