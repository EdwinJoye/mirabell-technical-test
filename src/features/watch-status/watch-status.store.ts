import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchStatusState = {
  likedMovieIds: number[];
  watchedMovieIds: number[];
  toggleLiked: (movieId: number) => void;
  toggleWatched: (movieId: number) => void;
};

function toggleId(ids: number[], movieId: number): number[] {
  return ids.includes(movieId) ? ids.filter((id) => id !== movieId) : [...ids, movieId];
}

export const useWatchStatusStore = create<WatchStatusState>()(
  persist(
    (set) => ({
      likedMovieIds: [],
      watchedMovieIds: [],
      toggleLiked: (movieId) =>
        set((state) => ({ likedMovieIds: toggleId(state.likedMovieIds, movieId) })),
      toggleWatched: (movieId) =>
        set((state) => ({ watchedMovieIds: toggleId(state.watchedMovieIds, movieId) })),
    }),
    { name: "watch-status" },
  ),
);
