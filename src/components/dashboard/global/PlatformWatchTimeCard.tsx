import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { ClockIcon, InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";
import type { WatchTimePoint } from "~/features/dashboard/dashboard.types";

function formatWatchTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}min`;
}

export function PlatformWatchTimeCard() {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const { stats, watchTimeOverTime: watchTimeData } = getGlobalDashboardData();

  const totalWatchTime = watchTimeData.reduce(
    (total, point) => total + point.totalWatchTimeMinutes,
    0,
  );

  const peak = watchTimeData.reduce((max, point) =>
    point.totalWatchTimeMinutes > max.totalWatchTimeMinutes ? point : max,
  );

  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <ClockIcon size={16} color="var(--mantine-color-brand-6)" />

            <Text size="sm" c="dimmed" fw={500}>
              Platform Watch Time
            </Text>
          </Group>

          <Tooltip
            label="Shows the evolution of total watch time and highlights consumption peaks."
            withArrow
            multiline
            w={260}
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

        <Text
          size="1.5rem"
          fw={700}
          c="white"
          style={{
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {formatWatchTime(totalWatchTime)}
        </Text>

        <Text size="xs" c="dimmed">
          Total watch time this {stats.period}
        </Text>

        <LineChart
          h={240}
          mt="sm"
          data={watchTimeData}
          dataKey="date"
          series={[
            {
              name: "totalWatchTimeMinutes",
              color: "brand.6",
            },
          ]}
          withXAxis
          withYAxis={false}
          withTooltip
          curveType="natural"
          gridAxis="none"
          strokeWidth={3}
          withDots={false}
          xAxisProps={{
            tickLine: false,
            axisLine: false,
          }}
          tooltipProps={{
            content: ({ payload }) => {
              if (!payload?.length) {
                return null;
              }

              const point = payload[0]?.payload as WatchTimePoint;

              return (
                <div
                  style={{
                    background: "var(--mantine-color-dark-7)",
                    border: "1px solid var(--mantine-color-dark-4)",
                    borderRadius: 8,
                    padding: "10px 14px",
                  }}
                >
                  <Text size="sm" fw={600} c="white">
                    {point.date}
                  </Text>

                  <Text size="sm" fw={700} c="brand.4" mt={6}>
                    {formatWatchTime(point.totalWatchTimeMinutes)}
                  </Text>
                </div>
              );
            },
          }}
        />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Peak consumption
          </Text>

          <Text size="xs" c="dimmed">
            <Text component="span" c="white" fw={600}>
              {peak.date}
            </Text>
            ·
            <Text component="span" c="brand.4" fw={600}>
              {formatWatchTime(peak.totalWatchTimeMinutes)}
            </Text>
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
