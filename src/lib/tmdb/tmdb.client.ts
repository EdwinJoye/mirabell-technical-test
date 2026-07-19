import { TMDB_BASE_URL } from "~/lib/configs/tmdb.config";
import { TmdbApiError } from "./tmdb.errors";

interface TmdbErrorResponse {
  status_message?: string;
  status_code?: number;
}

function isTmdbErrorResponse(value: unknown): value is TmdbErrorResponse {
  return typeof value === "object" && value !== null;
}

function parseTmdbErrorMessage(
  responseText: string,
  fallback: string,
): { message: string; tmdbStatusCode?: number } {
  try {
    const errorJson: unknown = JSON.parse(responseText);
    if (!isTmdbErrorResponse(errorJson)) {
      return { message: fallback };
    }
    return { message: errorJson.status_message ?? fallback, tmdbStatusCode: errorJson.status_code };
  } catch {
    return { message: fallback };
  }
}

export async function fetchTmdb<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      ...options?.headers,
    },
  });

  const responseText = await response.text();

  if (!response.ok) {
    const { message, tmdbStatusCode } = parseTmdbErrorMessage(
      responseText,
      `Erreur TMDb (${response.status})`,
    );
    throw new TmdbApiError(message, response.status, tmdbStatusCode);
  }

  return responseText ? (JSON.parse(responseText) as T) : ({} as T);
}
