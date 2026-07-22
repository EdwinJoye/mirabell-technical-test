import { Badge, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { EyeIcon, TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import type { MovieDashboardStats, MovieViewsPoint } from "~/features/dashboard/dashboard.types";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

const MIN_BAR_WIDTH = 28;

type MovieTotalViewsCardProps = {
  stats: MovieDashboardStats;
  viewsEvolution: MovieViewsPoint[];
};

export function MovieTotalViewsCard({ stats, viewsEvolution }: MovieTotalViewsCardProps) {
  const isPositiveGrowth = stats.growthRate >= 0;
  const growthPercent = (stats.growthRate * 100).toFixed(1);

  const averageDailyViews = Math.round(
    viewsEvolution.reduce((sum, point) => sum + point.views, 0) / viewsEvolution.length,
  );
  const peakPoint = viewsEvolution.reduce(
    (max, point) => (point.views > max.views ? point : max),
    viewsEvolution[0],
  );

  const chartWidth = Math.max(viewsEvolution.length * MIN_BAR_WIDTH, 300);

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={EyeIcon} />
            <Text size="sm" c="dimmed" fw={500}>
              Total Views
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Badge
              leftSection={
                isPositiveGrowth ? <TrendUpIcon size={12} /> : <TrendDownIcon size={12} />
              }
              color={isPositiveGrowth ? "brand" : "red"}
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={glassBadgeStyles}
            >
              {isPositiveGrowth ? "+" : ""}
              {growthPercent}%
            </Badge>

            <InfoTooltip label="More information" />
          </Group>
        </Group>

        <Text size="1.25rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.totalViews.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed" lineClamp={1}>
          Views for {stats.title}
        </Text>

        <Stack mt="auto" gap="sm">
          <ScrollArea type="auto" scrollbarSize={4}>
            <div style={{ width: chartWidth }}>
              <BarChart
                h={80}
                data={viewsEvolution}
                dataKey="date"
                series={[{ name: "views", color: "brand.6" }]}
                withXAxis={false}
                withYAxis={false}
                withTooltip
                gridAxis="none"
                barProps={{ radius: 4 }}
              />
            </div>
          </ScrollArea>

          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Daily avg:{" "}
              <Text component="span" c="white" fw={600}>
                {averageDailyViews.toLocaleString()}
              </Text>
            </Text>
            <Text size="xs" c="dimmed">
              Peak:{" "}
              <Text component="span" c="brand.4" fw={600}>
                {peakPoint.views.toLocaleString()}
              </Text>
            </Text>
          </Group>
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
