import { create } from "zustand";

type ScrollState = {
  scrollViewport: HTMLDivElement | null;
  setScrollViewport: (viewport: HTMLDivElement | null) => void;
};

export const useScrollStore = create<ScrollState>()((set) => ({
  scrollViewport: null,
  setScrollViewport: (viewport) => set({ scrollViewport: viewport }),
}));
