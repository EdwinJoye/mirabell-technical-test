import { ActionIcon, Badge, Group, Stack, Text, Tooltip } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { ClockIcon, InfoIcon, TrendUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import type { GlobalDashboardStats, WatchTimePoint } from "~/features/dashboard/dashboard.types";
import { getHoverIconColor } from "~/lib/theme/hover";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

function formatWatchTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours.toLocaleString()}h ${minutes}min`;
}

type WatchTimeCardProps = {
  stats: GlobalDashboardStats;
  watchTimeOverTime: WatchTimePoint[];
};

export function GlobalWatchTimeCard({ stats, watchTimeOverTime }: WatchTimeCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const avgPerUser = Math.round(stats.totalWatchTimeMinutes / stats.activeUsers);

  const previousWatchTime = watchTimeOverTime[0]?.totalWatchTimeMinutes ?? 0;

  const growthRate =
    previousWatchTime > 0
      ? ((stats.totalWatchTimeMinutes - previousWatchTime) / previousWatchTime) * 100
      : 0;

  const growthPercent = growthRate.toFixed(1);

  const peakWatchTime = Math.max(...watchTimeOverTime.map((point) => point.totalWatchTimeMinutes));

  const averageDailyWatchTime = Math.round(
    watchTimeOverTime.reduce((total, point) => total + point.totalWatchTimeMinutes, 0) /
      watchTimeOverTime.length,
  );

  return (
    <DashboardCard>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <ClockIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Total Watch Time
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Badge
              leftSection={<TrendUpIcon size={12} />}
              color="brand"
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={glassBadgeStyles}
            >
              +{growthPercent}%
            </Badge>

            <Tooltip
              label="Shows the total watch time for the current period and its evolution compared to the previous period."
              withArrow
              multiline
              w={260}
            >
              <ActionIcon
                variant="transparent"
                radius="xl"
                size="sm"
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
              >
                <InfoIcon size={18} color={getHoverIconColor(isInfoHovered)} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {formatWatchTime(stats.totalWatchTimeMinutes)}
        </Text>

        <Text size="xs" c="dimmed">
          ~{avgPerUser} min per active user
        </Text>

        <Stack mt="auto" gap="sm">
          <AreaChart
            h={70}
            data={watchTimeOverTime}
            dataKey="date"
            series={[
              {
                name: "totalWatchTimeMinutes",
                color: "brand.6",
              },
            ]}
            withXAxis={false}
            withYAxis={false}
            withDots={false}
            withTooltip
            curveType="natural"
            fillOpacity={0.25}
            strokeWidth={2}
          />

          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Peak day:{" "}
              <Text component="span" c="white" fw={600}>
                {(peakWatchTime / 1000000).toFixed(1)}M min
              </Text>
            </Text>

            <Text size="xs" c="dimmed">
              Daily avg:{" "}
              <Text component="span" c="white" fw={600}>
                {(averageDailyWatchTime / 1000000).toFixed(1)}M min
              </Text>
            </Text>
          </Group>
        </Stack>
      </Stack>
    </DashboardCard>
  );
}
