import { fetchTmdb } from "~/lib/tmdb/tmdb.client";
import { tmdbGenreListResponseSchema } from "~/lib/tmdb/tmdb.schemas";
import type { TmdbGenreListResponse } from "~/lib/tmdb/tmdb.types";

export async function fetchGenres(): Promise<TmdbGenreListResponse> {
  const data = await fetchTmdb<unknown>("/genre/movie/list");
  return tmdbGenreListResponseSchema.parse(data);
}
