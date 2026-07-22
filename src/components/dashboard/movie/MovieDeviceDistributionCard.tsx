import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import {
  DeviceMobileIcon,
  DeviceTabletIcon,
  InfoIcon,
  MonitorIcon,
  TelevisionIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";

const DEVICE_ICONS = {
  Mobile: DeviceMobileIcon,
  Tablet: DeviceTabletIcon,
  "Smart TV": TelevisionIcon,
  Desktop: MonitorIcon,
} as const;

const DEVICE_COLORS: Record<string, string> = {
  Mobile: "brand.6",
  "Smart TV": "violet.5",
  Desktop: "yellow.5",
  Tablet: "pink.5",
};

type MovieDeviceDistributionCardProps = {
  tmdbMovieId: number;
};

export function MovieDeviceDistributionCard({ tmdbMovieId }: MovieDeviceDistributionCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
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
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Group justify="space-between" align="center" mb="md">
        <Text size="sm" c="dimmed" fw={500}>
          Viewing Devices
        </Text>
        <Tooltip
          label="Shows the breakdown of viewing devices used to watch this movie."
          withArrow
          multiline
          w={220}
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
              color={isInfoHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-5)"}
            />
          </ActionIcon>
        </Tooltip>
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
    </Card>
  );
}
