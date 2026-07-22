import { DEFAULT_THEME } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { create } from "zustand";
import { theme } from "~/lib/theme/theme";

export const NAVBAR_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;

function isDesktopViewport(): boolean {
  return window.matchMedia(`(min-width: ${NAVBAR_BREAKPOINT})`).matches;
}

type NavbarState = {
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  close: () => void;
  closeMobile: () => void;
};

export const useNavbarStore = create<NavbarState>()((set) => ({
  isDesktopOpen: true,
  isMobileOpen: false,
  toggle: () =>
    set((state) =>
      isDesktopViewport()
        ? { isDesktopOpen: !state.isDesktopOpen }
        : { isMobileOpen: !state.isMobileOpen },
    ),
  close: () =>
    set(() => (isDesktopViewport() ? { isDesktopOpen: false } : { isMobileOpen: false })),
  closeMobile: () => set({ isMobileOpen: false }),
}));

export function useIsNavbarClosed(): boolean {
  const isDesktopOpen = useNavbarStore((state) => state.isDesktopOpen);
  const isMobileOpen = useNavbarStore((state) => state.isMobileOpen);
  const isDesktop = useMediaQuery(`(min-width: ${NAVBAR_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });

  return isDesktop ? !isDesktopOpen : !isMobileOpen;
}
