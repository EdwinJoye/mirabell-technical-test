import { Group, ScrollArea, SegmentedControl, Stack, Title } from "@mantine/core";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import { useSearchParams } from "react-router";
import { MovieStatsRow } from "~/components/dashboard/MovieStatsRow";
import { PlatformAudienceRow } from "~/components/dashboard/PlatformAudienceRow";
import { PlatformConsumptionRow } from "~/components/dashboard/PlatformConsumptionRow";
import { PlatformStatsRow } from "~/components/dashboard/PlatformStatsRow";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { getMovieOptions } from "~/features/dashboard/dashboard.service";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieOptions = getMovieOptions();

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
    <Stack gap="md" pl={{ base: 0, sm: "md" }} style={{ height: "calc(100dvh - 44px)" }}>
      <Group justify="space-between" wrap="wrap">
        <Title order={2}>Dashboard</Title>

        <Group gap="sm">
          <SegmentedControl
            value={view}
            onChange={handleViewChange}
            data={[
              {
                label: <SegmentedItemLabel icon={GlobeIcon} label="Global" />,
                value: "global",
              },
              {
                label: <SegmentedItemLabel icon={FilmSlateIcon} label="Movie" />,
                value: "movie",
              },
            ]}
            radius="xl"
            styles={segmentedControlStyles}
          />
        </Group>
      </Group>

      <ScrollArea type="auto" style={{ flex: 1 }}>
        <Stack gap="md">
          {view === "global" && (
            <>
              <PlatformStatsRow />
              <PlatformConsumptionRow />
              <PlatformAudienceRow />
            </>
          )}

          {view === "movie" && movieId && <MovieStatsRow tmdbMovieId={Number(movieId)} />}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
