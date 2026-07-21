import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import { ContinueWatchingCard } from "~/components/movie/ContinueWatchingCard";
import watchProgressData from "~/features/watch-progress/watch-progress.data.json";
import type { WatchProgressEntry } from "~/features/watch-progress/watch-progress.types";

const CARD_WIDTH = 260;

export function ContinueWatchingRow() {
  const entries = watchProgressData as WatchProgressEntry[];

  if (entries.length === 0) {
    return null;
  }

  const lastIndex = entries.length - 1;

  return (
    <Stack gap="md">
      <Title order={3}>Continuer</Title>
      <ScrollArea type="auto" scrollbarSize={6} offsetScrollbars my={-25}>
        <Group gap="md" wrap="nowrap" py={25}>
          {entries.map((entry, index) => (
            <div key={entry.tmdbMovieId} style={{ width: CARD_WIDTH, flexShrink: 0 }}>
              <ContinueWatchingCard
                tmdbMovieId={entry.tmdbMovieId}
                progressRatio={entry.progressRatio}
                zoomOrigin={index === 0 ? "left" : index === lastIndex ? "right" : "center"}
              />
            </div>
          ))}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
