import { DEFAULT_THEME, ScrollArea, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "react-router";
import { DashboardToolbar } from "~/components/dashboard/DashboardToolbar";
import { DashboardToolbarMobile } from "~/components/dashboard/DashboardToolbarMobile";
import { MoviePosterRow } from "~/components/dashboard/movie/MoviePosterRow";
import { MovieStatsRow } from "~/components/dashboard/movie/MovieStatsRow";
import { PlatformAudienceRow } from "~/components/dashboard/global/PlatformAudienceRow";
import { PlatformConsumptionRow } from "~/components/dashboard/global/PlatformConsumptionRow";
import { PlatformStatsRow } from "~/components/dashboard/global/PlatformStatsRow";
import { getMovieOptions } from "~/features/dashboard/dashboard.service";
import { useScrollStore } from "~/features/scroll/scroll.store";
import { theme } from "~/lib/theme/theme";

const DASHBOARD_TOOLBAR_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieOptions = getMovieOptions();
  const setScrollViewport = useScrollStore((state) => state.setScrollViewport);
  const isDesktop = useMediaQuery(`(min-width: ${DASHBOARD_TOOLBAR_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });

  const view = searchParams.get("view") === "movie" ? "movie" : "global";
  const movieId = searchParams.get("movieId") ?? movieOptions[0]?.value ?? null;

  function handleViewChange(value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.set("view", value);
        if (value === "movie" && !next.get("movieId")) {
          next.set("movieId", movieOptions[0]?.value ?? "");
        }
        return next;
      },
      { replace: true },
    );
  }

  function handleMovieChange(value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.set("movieId", value);
        return next;
      },
      { replace: true },
    );
  }

  return (
    <Stack gap="md" style={{ height: "calc(100dvh - 35px)" }}>
      {isDesktop ? (
        <DashboardToolbar
          view={view}
          onViewChange={handleViewChange}
          movieOptions={movieOptions}
          movieId={movieId}
          onMovieChange={handleMovieChange}
        />
      ) : (
        <DashboardToolbarMobile
          view={view}
          onViewChange={handleViewChange}
          movieOptions={movieOptions}
          movieId={movieId}
          onMovieChange={handleMovieChange}
        />
      )}

      <ScrollArea type="auto" style={{ flex: 1 }} viewportRef={setScrollViewport}>
        <Stack gap="md">
          {view === "global" && (
            <>
              <PlatformStatsRow />
              <PlatformAudienceRow />
              <PlatformConsumptionRow />
            </>
          )}

          {view === "movie" && movieId && (
            <>
              <MoviePosterRow tmdbMovieId={Number(movieId)} />
              <MovieStatsRow tmdbMovieId={Number(movieId)} />
            </>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
