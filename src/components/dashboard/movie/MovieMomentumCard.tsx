import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { dashboardCardGradient, glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

const LAST_30_DAYS_POINT_COUNT = 4;

type MovieMomentumCardProps = {
  tmdbMovieId: number;
};

export function MovieMomentumCard({ tmdbMovieId }: MovieMomentumCardProps) {
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!dashboardData) {
    return null;
  }

  const { stats, viewsEvolution } = dashboardData;

  const momentumData = viewsEvolution.map((point) => ({
    day: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    views: point.views,
  }));

  const last30DaysPoints = viewsEvolution.slice(-LAST_30_DAYS_POINT_COUNT);
  const viewsLast30Days = last30DaysPoints.reduce((sum, point) => sum + point.views, 0);
  const dailyAverage = Math.round(viewsLast30Days / 30);

  const peakPoint = viewsEvolution.reduce(
    (max, point) => (point.views > max.views ? point : max),
    viewsEvolution[0],
  );
  const peakDayLabel = new Date(peakPoint.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const isPositiveGrowth = stats.growthRate >= 0;
  const growthPercent = (stats.growthRate * 100).toFixed(1);

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
          <TrendUpIcon size={16} color={BRAND_COLOR} />

          <Text size="sm" c="dimmed" fw={500}>
            Viewing Momentum
          </Text>
        </Group>

        <Group gap={6}>
          <Badge
            leftSection={isPositiveGrowth ? <TrendUpIcon size={12} /> : <TrendDownIcon size={12} />}
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

          <InfoTooltip
            label="Shows how viewing activity evolves over time to identify whether this movie is gaining or losing momentum."
            width={260}
          />
        </Group>
      </Group>

      <Text
        size="2rem"
        fw={700}
        c="white"
        style={{
          letterSpacing: -0.5,
          lineHeight: 1.1,
        }}
      >
        {viewsLast30Days.toLocaleString()}
      </Text>

      <Text size="xs" c="dimmed">
        Views in the last 30 days
      </Text>

      <div style={{ height: 160, marginTop: "var(--mantine-spacing-md)" }}>
        <AreaChart
          h="100%"
          w="100%"
          data={momentumData}
          dataKey="day"
          series={[
            {
              name: "views",
              color: "brand.6",
              label: "Views",
            },
          ]}
          curveType="natural"
          fillOpacity={0.2}
          strokeWidth={2}
          withDots={false}
          withTooltip
          withYAxis={false}
          gridAxis="y"
        />
      </div>

      <Group justify="space-between" mt="md">
        <Stack gap={2}>
          <Text size="xs" c="dimmed">
            Peak day
          </Text>

          <Text size="sm" fw={600} c="white">
            {peakDayLabel}
          </Text>
        </Stack>

        <Stack gap={2} align="flex-end">
          <Text size="xs" c="dimmed">
            Daily average
          </Text>

          <Text size="sm" fw={600} c="brand.4">
            {dailyAverage.toLocaleString()} views
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
