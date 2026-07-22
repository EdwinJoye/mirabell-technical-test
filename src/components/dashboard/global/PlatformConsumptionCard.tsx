import { AreaChart } from "@mantine/charts";
import { ActionIcon, Card, Group, Text, Tooltip } from "@mantine/core";
import { ClockIcon, InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { DEVICE_COLORS, dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";
import { formatWatchTime } from "~/features/dashboard/dashboard.utils";
import { getHoverIconColor } from "~/lib/theme/hover";
import { BRAND_COLOR } from "~/lib/theme/theme";

export function PlatformConsumptionCard() {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const { stats, watchTimeOverTime, deviceDistribution } = getGlobalDashboardData();

  const watchTimeByDevice = watchTimeOverTime.map((point) => {
    const byDevice: Record<string, number | string> = { date: point.date };

    for (const device of deviceDistribution) {
      byDevice[device.deviceType] = Math.round(
        (point.totalWatchTimeMinutes * device.percentage) / 100,
      );
    }

    return byDevice;
  });

  const totalWatchTime = watchTimeOverTime.reduce(
    (total, point) => total + point.totalWatchTimeMinutes,
    0,
  );

  const peak = watchTimeOverTime.reduce((max, point) =>
    point.totalWatchTimeMinutes > max.totalWatchTimeMinutes ? point : max,
  );

  return (
    <Card
      radius="lg"
      p="sm"
      style={{
        ...dashboardCardGradient,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Group justify="space-between" align="center" mb="md">
        <Group gap={8}>
          <ClockIcon size={16} color={BRAND_COLOR} />

          <Text size="sm" c="dimmed" fw={500}>
            Platform Consumption
          </Text>
        </Group>

        <Tooltip
          label="Shows how total watch time evolves across viewing devices."
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
            <InfoIcon size={18} color={getHoverIconColor(isInfoHovered)} />
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

      <Text size="xs" c="dimmed" mb="sm">
        Total watch time this {stats.period}
      </Text>

      <div style={{ flex: 1, minHeight: 0 }}>
        <AreaChart
          h={240}
          w="100%"
          data={watchTimeByDevice}
          dataKey="date"
          series={[
            { name: "Mobile", color: DEVICE_COLORS.Mobile },
            { name: "Smart TV", color: DEVICE_COLORS["Smart TV"] },
            { name: "Desktop", color: DEVICE_COLORS.Desktop },
            { name: "Tablet", color: DEVICE_COLORS.Tablet },
            { name: "Console", color: DEVICE_COLORS.Console },
          ]}
          curveType="natural"
          fillOpacity={0.25}
          strokeWidth={2}
          withDots={false}
          withTooltip
          withLegend
          withYAxis={false}
          gridAxis="y"
        />
      </div>

      <Group justify="space-between" mt="sm">
        <Text size="xs" c="dimmed">
          Peak consumption
        </Text>

        <Text size="xs" c="dimmed">
          <Text component="span" c="white" fw={600}>
            {peak.date}
          </Text>
        </Text>
      </Group>
    </Card>
  );
}
