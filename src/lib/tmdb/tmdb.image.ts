import { TMDB_IMAGE_BASE_URL } from "~/lib/configs/tmdb.config";

export type TmdbImageSize = "w200" | "w300" | "w500" | "original";

export function getTmdbImageUrl(path: string, size: TmdbImageSize = "w500"): string {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
