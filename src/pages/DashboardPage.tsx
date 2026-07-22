import { ScrollArea, Stack } from "@mantine/core";
import { useSearchParams } from "react-router";
import { DashboardToolbar } from "~/components/dashboard/DashboardToolbar";
import { MoviePosterRow } from "~/components/dashboard/MoviePosterRow";
import { MovieStatsRow } from "~/components/dashboard/MovieStatsRow";
import { PlatformAudienceRow } from "~/components/dashboard/PlatformAudienceRow";
import { PlatformConsumptionRow } from "~/components/dashboard/PlatformConsumptionRow";
import { PlatformStatsRow } from "~/components/dashboard/PlatformStatsRow";
import { getMovieOptions } from "~/features/dashboard/dashboard.service";
import { useScrollStore } from "~/features/scroll/scroll.store";

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

  return (
    <Stack gap="md" style={{ height: "calc(100dvh - 35px)" }}>
      <DashboardToolbar view={view} onViewChange={handleViewChange} />

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
