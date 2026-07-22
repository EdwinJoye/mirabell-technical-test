import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { DeviceMobileIcon, InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient, DEVICE_COLORS } from "~/components/dashboard/dashboard.styles";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";
import { getHoverIconColor } from "~/lib/theme/hover";
import { BRAND_COLOR } from "~/lib/theme/theme";

export function DeviceDistributionCard() {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const { deviceDistribution: devices } = getGlobalDashboardData();

  const chartData = devices.map((device) => ({
    name: device.deviceType,
    value: device.percentage,
    color: DEVICE_COLORS[device.deviceType] ?? "gray.6",
  }));

  const totalViews = devices.reduce((total, device) => total + device.views, 0);

  const topDevice = [...devices].sort((a, b) => b.percentage - a.percentage)[0];

  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <DeviceMobileIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Device Distribution
            </Text>
          </Group>

          <Tooltip
            label="Shows how users consume content across different devices."
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
          {totalViews.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          Views by device
        </Text>

        <Group justify="center" mt="md">
          <DonutChart data={chartData} size={200} thickness={28} />
        </Group>

        <Stack gap={8} mt="sm">
          {devices.map((device) => (
            <Group key={device.deviceType} justify="space-between">
              <Text size="xs" c="dimmed">
                {device.deviceType}
              </Text>

              <Text size="xs" c="white" fw={600}>
                {device.percentage}%
              </Text>
            </Group>
          ))}
        </Stack>

        <Group justify="space-between" mt="sm">
          <Text size="xs" c="dimmed">
            Most used device
          </Text>

          <Text size="xs" c="white" fw={600}>
            {topDevice.deviceType} ({topDevice.percentage}%)
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
