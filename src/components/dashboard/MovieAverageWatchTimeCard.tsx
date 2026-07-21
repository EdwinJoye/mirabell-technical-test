import { Card, Group, Stack, Text } from "@mantine/core";
import { RadialBarChart } from "@mantine/charts";
import { ClockIcon } from "@phosphor-icons/react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import type { MovieDashboardStats } from "~/features/dashboard/dashboard.types";

type MovieAverageWatchTimeCardProps = {
  tmdbMovieId: number;
  stats: MovieDashboardStats;
};

export function MovieAverageWatchTimeCard({ tmdbMovieId, stats }: MovieAverageWatchTimeCardProps) {
  const { data: movieDetails } = useMovieDetails(tmdbMovieId);
  const runtime = movieDetails?.runtime;
  const watchedPercent = runtime
    ? Math.min(Math.round((stats.averageWatchTimeMinutes / runtime) * 100), 100)
    : null;

  return (
    <Card radius="lg" p="lg" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap={6} h="100%">
        <Group gap={8}>
          <ClockIcon size={16} color="var(--mantine-color-brand-6)" />

          <Text size="sm" c="dimmed" fw={500}>
            Average Watch Time
          </Text>
        </Group>

        <Text size="2rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.averageWatchTimeMinutes} min
        </Text>

        <Text size="xs" c="dimmed">
          {runtime ? `Out of ${runtime} min runtime` : "Average time watched per session"}
        </Text>

        {watchedPercent !== null && (
          <Group justify="center" mt="auto">
            <RadialBarChart
              h={110}
              data={[{ name: "Watched", value: watchedPercent, color: "brand.6" }]}
              dataKey="value"
              barSize={14}
              withLabels
            />
          </Group>
        )}
      </Stack>
    </Card>
  );
}
