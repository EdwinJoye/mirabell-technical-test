import { ScrollArea, Stack } from "@mantine/core";
import { useSearchParams } from "react-router";
import { DashboardToolbar } from "~/components/dashboard/DashboardToolbar";
import { MoviePosterRow } from "~/components/dashboard/movie/MoviePosterRow";
import { MovieStatsRow } from "~/components/dashboard/movie/MovieStatsRow";
import { GlobalAudienceRow } from "~/components/dashboard/global/GlobalAudienceRow";
import { GlobalConsumptionRow } from "~/components/dashboard/global/GlobalConsumptionRow";
import { GlobalStatsRow } from "~/components/dashboard/global/GlobalStatsRow";
import { getMovieOptions } from "~/features/dashboard/dashboard.service";
import { useScrollStore } from "~/features/scroll/scroll.store";
import { MovieInsightsRow } from "~/components/dashboard/movie/MovieInsightsRow";
import { MovieConsumptionRow } from "~/components/dashboard/movie/MovieConsumptionRow";

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieOptions = getMovieOptions();
  const setScrollViewport = useScrollStore((state) => state.setScrollViewport);

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
      <DashboardToolbar
        view={view}
        onViewChange={handleViewChange}
        movieOptions={movieOptions}
        movieId={movieId}
        onMovieChange={handleMovieChange}
      />

      <ScrollArea type="auto" style={{ flex: 1 }} viewportRef={setScrollViewport}>
        <Stack gap="md">
          {view === "global" && (
            <>
              <GlobalStatsRow />
              <GlobalAudienceRow />
              <GlobalConsumptionRow />
            </>
          )}

          {view === "movie" && movieId && (
            <>
              <MoviePosterRow tmdbMovieId={Number(movieId)} />
              <MovieStatsRow tmdbMovieId={Number(movieId)} />
              <MovieInsightsRow tmdbMovieId={Number(movieId)} />
              <MovieConsumptionRow tmdbMovieId={Number(movieId)} />
            </>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
