import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { InfoIcon, UsersIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { LegendDot } from "~/components/dashboard/LegendDot";
import type { MovieDashboardStats } from "~/features/dashboard/dashboard.types";

type MovieUniqueViewersCardProps = {
  stats: MovieDashboardStats;
};

export function MovieUniqueViewersCard({ stats }: MovieUniqueViewersCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const repeatViews = Math.max(stats.totalViews - stats.uniqueViewers, 0);
  const uniqueRatio = Math.round((stats.uniqueViewers / stats.totalViews) * 100);
  const avgViewsPerViewer = (stats.totalViews / stats.uniqueViewers).toFixed(2);

  const chartData = [
    { name: "Unique viewers", value: stats.uniqueViewers, color: "brand.6" },
    { name: "Repeat views", value: repeatViews, color: "dark.3" },
  ];

  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={UsersIcon} />
            <Text size="sm" c="dimmed" fw={500}>
              Unique Viewers
            </Text>
          </Group>

          <Tooltip
            label="Shows how many distinct viewers watched this movie, and how many total views came from repeat watches."
            withArrow
            multiline
            w={240}
          >
            <ActionIcon
              variant="transparent"
              radius="xl"
              size="sm"
              aria-label="More information"
              onMouseEnter={() => setIsInfoHovered(true)}
              onMouseLeave={() => setIsInfoHovered(false)}
            >
              <InfoIcon
                size={18}
                color={
                  isInfoHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-5)"
                }
              />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.uniqueViewers.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          {uniqueRatio}% of views are unique viewers
        </Text>

        <Group justify="space-between" align="center" mt="auto">
          <DonutChart data={chartData} size={90} thickness={14} withTooltip />

          <Stack gap={8}>
            <Group gap={6}>
              <LegendDot color="var(--mantine-color-brand-6)" />
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
    </Card>
  );
}
