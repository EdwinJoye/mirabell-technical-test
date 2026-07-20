import type { z } from "zod";
import type {
  tmdbMovieSchema,
  tmdbDiscoverMovieResponseSchema,
  tmdbGenreSchema,
  tmdbGenreListResponseSchema,
} from "./tmdb.schemas";

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>;
export type TmdbDiscoverMovieResponse = z.infer<typeof tmdbDiscoverMovieResponseSchema>;
export type TmdbGenre = z.infer<typeof tmdbGenreSchema>;
export type TmdbGenreListResponse = z.infer<typeof tmdbGenreListResponseSchema>;
