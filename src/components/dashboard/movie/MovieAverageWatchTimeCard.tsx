import { Badge, Group, Progress, Stack, Text } from "@mantine/core";
import { ClockIcon } from "@phosphor-icons/react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import type { MovieDashboardStats } from "~/features/dashboard/dashboard.types";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

type MovieAverageWatchTimeCardProps = {
  tmdbMovieId: number;
  stats: MovieDashboardStats;
};

function getEngagementLabel(percent: number): { label: string; color: string } {
  if (percent >= 80) return { label: "Excellent", color: "brand" };
  if (percent >= 50) return { label: "Good", color: "yellow" };
  return { label: "Low", color: "red" };
}

export function MovieAverageWatchTimeCard({ tmdbMovieId, stats }: MovieAverageWatchTimeCardProps) {
  const { data: movieDetails } = useMovieDetails(tmdbMovieId);
  const runtime = movieDetails?.runtime;

  const watchedPercent = runtime
    ? Math.min(Math.round((stats.averageWatchTimeMinutes / runtime) * 100), 100)
    : null;
  const remainingMinutes = runtime ? Math.max(runtime - stats.averageWatchTimeMinutes, 0) : null;
  const engagement = watchedPercent !== null ? getEngagementLabel(watchedPercent) : null;

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={ClockIcon} />
            <Text size="sm" c="dimmed" fw={500}>
              Average Watch Time
            </Text>
          </Group>

          <Group gap={6} align="center">
            {engagement && (
              <Badge
                color={engagement.color}
                variant="filled"
                tt="none"
                fw={500}
                size="sm"
                styles={glassBadgeStyles}
              >
                {engagement.label}
              </Badge>
            )}

            <InfoTooltip label="Shows the average time viewers spent watching this movie compared to its full runtime, with an engagement rating." />
          </Group>
        </Group>

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.averageWatchTimeMinutes} min
        </Text>

        <Text size="xs" c="dimmed">
          {runtime ? `Out of ${runtime} min runtime` : "Average time watched per session"}
        </Text>

        {watchedPercent !== null && remainingMinutes !== null && (
          <Stack gap={6} mt="auto">
            <Progress value={watchedPercent} color="brand" size="lg" radius="xl" />

            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                Watched:{" "}
                <Text component="span" c="white" fw={600}>
                  {watchedPercent}%
                </Text>
              </Text>
              <Text size="xs" c="dimmed">
                Remaining:{" "}
                <Text component="span" c="white" fw={600}>
                  {remainingMinutes} min
                </Text>
              </Text>
            </Group>
          </Stack>
        )}
      </Stack>
    </DashboardCard>
  );
}
