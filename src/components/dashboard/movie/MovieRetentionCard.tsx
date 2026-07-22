import { ActionIcon, Card, Group, Text, Tooltip } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import type { RetentionPoint } from "~/features/dashboard/dashboard.types";

const PLATFORM_AVERAGE_RETENTION = [100, 92, 80, 65, 54, 49, 46];

type MovieRetentionCardProps = {
  retentionCurve: RetentionPoint[];
};

export function MovieRetentionCard({ retentionCurve }: MovieRetentionCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const retentionData = retentionCurve.map((point, index) => ({
    ...point,
    platformAverage: PLATFORM_AVERAGE_RETENTION[index],
  }));

  return (
    <Card
      radius="lg"
      p="sm"
      style={{ ...dashboardCardGradient, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Group justify="space-between" align="center" mb="md">
        <Text size="sm" c="dimmed" fw={500}>
          Audience Retention
        </Text>

        <Tooltip
          label="Compares this movie's audience retention to the platform average at each point of the runtime."
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
              color={isInfoHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-5)"}
            />
          </ActionIcon>
        </Tooltip>
      </Group>

      <div style={{ flex: 1, minHeight: 0 }}>
        <AreaChart
          h="100%"
          w="100%"
          data={retentionData}
          dataKey="percentageWatched"
          series={[
            { name: "thisMovie", color: "brand.6", label: "This movie" },
            { name: "platformAverage", color: "gray.5", label: "Platform average" },
          ]}
          curveType="natural"
          fillOpacity={0.2}
          strokeWidth={2}
          withDots={false}
          withTooltip
          withLegend
          withYAxis={false}
          gridAxis="y"
        />
      </div>
    </Card>
  );
}
