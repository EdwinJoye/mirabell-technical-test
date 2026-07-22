import { Card, Group, Stack, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { GlobeIcon } from "@phosphor-icons/react";
import { CardIconBadge } from "~/components/dashboard/CardIconBadge";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

type MovieGeoDistributionCardProps = {
  tmdbMovieId: number;
};

export function MovieGeoDistributionCard({ tmdbMovieId }: MovieGeoDistributionCardProps) {
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!dashboardData) {
    return null;
  }

  const totalViews = dashboardData.stats.totalViews;
  const geoData = dashboardData.geoDistribution.map((entry) => ({
    ...entry,
    views: Math.round((totalViews * entry.percentage) / 100),
  }));

  const topCountry = geoData.reduce(
    (max, entry) => (entry.percentage > max.percentage ? entry : max),
    geoData[0],
  );

  return (
    <Card
      radius="lg"
      p="lg"
      style={{
        ...dashboardCardGradient,
        height: "100%",
      }}
    >
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <CardIconBadge icon={GlobeIcon} />

            <Text size="sm" c="dimmed" fw={500}>
              Top Countries
            </Text>
          </Group>

          <InfoTooltip label="Shows the countries where this movie was watched the most, based on share of total views." />
        </Group>

        <BarChart
          h={200}
          data={geoData}
          dataKey="country"
          series={[{ name: "percentage", color: "brand.6" }]}
          orientation="vertical"
          withXAxis={false}
          withYAxis
          withTooltip
          gridAxis="none"
          yAxisProps={{
            width: 100,
            tickLine: false,
            axisLine: false,
          }}
          barProps={{ radius: 6 }}
          valueFormatter={(value) => `${value}%`}
        />

        <Group justify="space-between">
          <Group>
            <Text size="xs" c="dimmed">
              Total views
            </Text>
            <Text size="xs" fw={600} c="white">
              {totalViews.toLocaleString()}
            </Text>
          </Group>

          <Group>
            <Text size="xs" c="dimmed">
              Leading audience
            </Text>
            <Text size="xs" fw={600} c="white">
              {topCountry.country} · {topCountry.percentage}%
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
