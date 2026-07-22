import { Badge, Group, Stack, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { EyeIcon, TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import type { GlobalDashboardStats } from "~/features/dashboard/dashboard.types";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

type TotalViewsCardProps = {
  stats: GlobalDashboardStats;
};

export function GlobalTotalViewsCard({ stats }: TotalViewsCardProps) {
  const isPositiveGrowth = stats.growthRate >= 0;
  const growthPercent = (stats.growthRate * 100).toFixed(1);
  const viewsDelta = stats.totalViews - stats.previousPeriodViews;

  const comparisonData = [
    { label: `2 ${stats.period}s ago`, views: stats.twoPeriodsAgoViews },
    { label: `Last ${stats.period}`, views: stats.previousPeriodViews },
    { label: `This ${stats.period}`, views: stats.totalViews },
  ];

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <EyeIcon size={16} color={BRAND_COLOR} />

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

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.totalViews.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          Total views this {stats.period}
        </Text>

        <Stack mt="auto" gap="sm">
          <BarChart
            h={100}
            data={comparisonData}
            dataKey="label"
            series={[
              {
                name: "views",
                color: "brand.6",
              },
            ]}
            withXAxis
            withYAxis={false}
            withTooltip
            gridAxis="none"
            barProps={{ radius: 6 }}
          />

          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Previous {stats.period}:{" "}
              <Text component="span" c="white" fw={600}>
                {stats.previousPeriodViews.toLocaleString()}
              </Text>
            </Text>

            <Text size="xs" c="dimmed">
              Growth:{" "}
              <Text component="span" c={isPositiveGrowth ? "brand.4" : "red.4"} fw={600}>
                {isPositiveGrowth ? "+" : ""}
                {viewsDelta.toLocaleString()}
              </Text>
            </Text>
          </Group>
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
