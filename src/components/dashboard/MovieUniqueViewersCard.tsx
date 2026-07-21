import { Card, Group, Stack, Text } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { UsersIcon } from "@phosphor-icons/react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import type { MovieDashboardStats } from "~/features/dashboard/dashboard.types";

type MovieUniqueViewersCardProps = {
  stats: MovieDashboardStats;
};

export function MovieUniqueViewersCard({ stats }: MovieUniqueViewersCardProps) {
  const repeatViews = Math.max(stats.totalViews - stats.uniqueViewers, 0);
  const uniqueRatio = Math.round((stats.uniqueViewers / stats.totalViews) * 100);

  const chartData = [
    { name: "Unique viewers", value: stats.uniqueViewers, color: "brand.6" },
    { name: "Repeat views", value: repeatViews, color: "dark.3" },
  ];

  return (
    <Card radius="lg" p="lg" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap={6} h="100%">
        <Group gap={8}>
          <UsersIcon size={16} color="var(--mantine-color-brand-6)" />

          <Text size="sm" c="dimmed" fw={500}>
            Unique Viewers
          </Text>
        </Group>

        <Text size="2rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.uniqueViewers.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          {uniqueRatio}% of views are unique viewers
        </Text>

        <Group justify="center" mt="auto">
          <DonutChart data={chartData} size={110} thickness={14} withTooltip />
        </Group>
      </Stack>
    </Card>
  );
}
