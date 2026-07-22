import { Group, Stack, Text } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import {
  DeviceMobileIcon,
  DeviceTabletIcon,
  GameControllerIcon,
  MonitorIcon,
  TelevisionIcon,
} from "@phosphor-icons/react";

import { DEVICE_COLORS } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

const DEVICE_ICONS = {
  Mobile: DeviceMobileIcon,
  Tablet: DeviceTabletIcon,
  "Smart TV": TelevisionIcon,
  Desktop: MonitorIcon,
  Console: GameControllerIcon,
} as const;

type MovieDeviceDistributionCardProps = {
  tmdbMovieId: number;
};

export function MovieDeviceDistributionCard({ tmdbMovieId }: MovieDeviceDistributionCardProps) {
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!dashboardData) {
    return null;
  }

  const deviceData = dashboardData.deviceDistribution.map((device) => ({
    name: device.deviceType,
    value: device.percentage,
    color: DEVICE_COLORS[device.deviceType] ?? "gray.5",
  }));

  return (
    <DashboardCard>
      <Group justify="space-between" align="center" mb="md">
        <Text size="sm" c="dimmed" fw={500}>
          Viewing Devices
        </Text>
        <InfoTooltip
          label="Shows the breakdown of viewing devices used to watch this movie."
          width={220}
        />
      </Group>

      <Group justify="center" mb="md">
        <DonutChart data={deviceData} size={140} thickness={20} withTooltip paddingAngle={3} />
      </Group>

      <Stack gap={8}>
        {deviceData.map((device) => {
          const Icon = DEVICE_ICONS[device.name as keyof typeof DEVICE_ICONS];
          const cssColor = `var(--mantine-color-${device.color.replace(".", "-")})`;
          return (
            <Group key={device.name} justify="space-between">
              <Group gap={8}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `color-mix(in srgb, ${cssColor} 18%, transparent)`,
                  }}
                >
                  <Icon size={13} color={cssColor} />
                </div>
                <Text size="sm" c="dimmed">
                  {device.name}
                </Text>
              </Group>
              <Text size="sm" c="white" fw={600}>
                {device.value}%
              </Text>
            </Group>
          );
        })}
      </Stack>
    </DashboardCard>
  );
}
