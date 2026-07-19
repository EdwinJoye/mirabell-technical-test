import type { z } from "zod";
import type { tmdbMovieSchema, tmdbDiscoverMovieResponseSchema } from "./tmdb.schemas";

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>;
export type TmdbDiscoverMovieResponse = z.infer<typeof tmdbDiscoverMovieResponseSchema>;
