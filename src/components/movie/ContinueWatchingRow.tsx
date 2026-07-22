import { Divider, Flex, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Title order={3} size="h4" c="white">
            Continue Watching
          </Title>
          <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} />
        </Flex>
        <ScrollArea type="never" my={-25}>
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
    </motion.div>
  );
}
