import { Card, Group, Stack, Text } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { ArrowClockwiseIcon } from "@phosphor-icons/react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

type MovieAudienceLoyaltyCardProps = {
  tmdbMovieId: number;
};

export function MovieAudienceLoyaltyCard({ tmdbMovieId }: MovieAudienceLoyaltyCardProps) {
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!dashboardData) {
    return null;
  }

  const { rewatchedPercentage, rewatchedViewers } = dashboardData.audienceLoyalty;
  const firstWatchPercentage = 100 - rewatchedPercentage;

  const rewatchData = [
    {
      name: "First watch",
      value: firstWatchPercentage,
      color: "dark.3",
    },
    {
      name: "Rewatched",
      value: rewatchedPercentage,
      color: "brand.6",
    },
  ];

  return (
    <Card
      radius="lg"
      p="lg"
      style={{
        ...dashboardCardGradient,
        height: "100%",
      }}
    >
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <ArrowClockwiseIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Rewatch Rate
            </Text>
          </Group>

          <InfoTooltip label="Shows the percentage of viewers who watched this movie more than once." />
        </Group>

        <Group justify="center" mt="xs">
          <PieChart data={rewatchData} size={150} withTooltip tooltipDataSource="segment" />
        </Group>

        <Group justify="space-between" mt="auto">
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              First watch
            </Text>
            <Text size="sm" fw={600} c="white">
              {firstWatchPercentage.toFixed(1)}%
            </Text>
          </Stack>

          <Stack gap={2} align="flex-end">
            <Text size="xs" c="dimmed">
              Rewatched
            </Text>
            <Text size="sm" fw={600} c="brand.4">
              {rewatchedPercentage.toFixed(1)}%
            </Text>
          </Stack>
        </Group>

        <Text size="xs" c="dimmed">
          {rewatchedViewers.toLocaleString()} viewers watched this movie more than once
        </Text>
      </Stack>
    </Card>
  );
}
