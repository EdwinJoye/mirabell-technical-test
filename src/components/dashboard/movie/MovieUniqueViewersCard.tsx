import { Group, Stack, Text } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { UsersIcon } from "@phosphor-icons/react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import { LegendDot } from "~/components/dashboard/LegendDot";
import type { MovieDashboardStats } from "~/features/dashboard/dashboard.types";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

type MovieUniqueViewersCardProps = {
  stats: MovieDashboardStats;
};

export function MovieUniqueViewersCard({ stats }: MovieUniqueViewersCardProps) {
  const repeatViews = Math.max(stats.totalViews - stats.uniqueViewers, 0);
  const uniqueRatio = Math.round((stats.uniqueViewers / stats.totalViews) * 100);
  const avgViewsPerViewer = (stats.totalViews / stats.uniqueViewers).toFixed(2);

  const chartData = [
    { name: "Unique viewers", value: stats.uniqueViewers, color: "brand.6" },
    { name: "Repeat views", value: repeatViews, color: "dark.3" },
  ];

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={UsersIcon} />
            <Text size="sm" c="dimmed" fw={500}>
              Unique Viewers
            </Text>
          </Group>

          <InfoTooltip label="Shows how many distinct viewers watched this movie, and how many total views came from repeat watches." />
        </Group>

        <Text size="1.25rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.uniqueViewers.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          {uniqueRatio}% of views are unique viewers
        </Text>

        <Group justify="space-between" align="center" mt="auto">
          <DonutChart data={chartData} size={90} thickness={14} withTooltip />

          <Stack gap={8}>
            <Group gap={6}>
              <LegendDot color={BRAND_COLOR} />
              <Text size="xs" c="dimmed">
                {stats.uniqueViewers.toLocaleString()} unique
              </Text>
            </Group>
            <Group gap={6}>
              <LegendDot color="var(--mantine-color-dark-3)" />
              <Text size="xs" c="dimmed">
                {repeatViews.toLocaleString()} repeat
              </Text>
            </Group>
            <Text size="xs" c="dimmed" mt={2}>
              {avgViewsPerViewer} views/viewer
            </Text>
          </Stack>
        </Group>
      </Stack>
    </DashboardCard>
  );
}
