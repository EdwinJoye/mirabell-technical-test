import { Card, Group, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import type { RetentionPoint } from "~/features/dashboard/dashboard.types";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

const PLATFORM_AVERAGE_RETENTION = [100, 92, 80, 65, 54, 49, 46];

type MovieRetentionCardProps = {
  retentionCurve: RetentionPoint[];
};

export function MovieRetentionCard({ retentionCurve }: MovieRetentionCardProps) {
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

        <InfoTooltip label="Compares this movie's audience retention to the platform average at each point of the runtime." />
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
