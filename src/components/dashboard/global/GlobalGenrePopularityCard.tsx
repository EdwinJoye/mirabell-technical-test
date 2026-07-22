import { Group, Stack, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { FilmSlateIcon } from "@phosphor-icons/react";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";
import { formatWatchTime } from "~/features/dashboard/dashboard.utils";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { DashboardCard } from "~/components/dashboard/DashboardCard";

type ChartGenre = {
  genre: string;
  views: number;
  watchTime: number;
};

export function GlobalGenrePopularityCard() {
  const { stats, genrePopularity: genres } = getGlobalDashboardData();

  const chartData: ChartGenre[] = [...genres]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 8)
    .map((genre) => ({
      genre: genre.genre,
      views: genre.totalViews,
      watchTime: genre.totalWatchTimeMinutes,
    }));

  return (
    <DashboardCard>
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <FilmSlateIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Genre Popularity
            </Text>
          </Group>

          <InfoTooltip
            label="Shows which genres attract the most audience based on total views and watch time."
            width={260}
          />
        </Group>

        <Text
          size="1.25rem"
          fw={700}
          c="white"
          style={{
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {genres.length}
        </Text>

        <Text size="xs" c="dimmed">
          Most popular genres this {stats.period}
        </Text>

        <BarChart
          h={280}
          mt="sm"
          data={chartData}
          dataKey="genre"
          series={[
            {
              name: "views",
              color: "brand.6",
            },
          ]}
          withXAxis
          withYAxis
          withTooltip
          gridAxis="none"
          barProps={{
            radius: 6,
            cursor: "pointer",
          }}
          xAxisProps={{
            tickLine: false,
            axisLine: false,
          }}
          yAxisProps={{
            tickLine: false,
            axisLine: false,
          }}
          tooltipProps={{
            content: ({ payload }) => {
              if (!payload?.length) {
                return null;
              }

              const genre = payload[0]?.payload as ChartGenre;

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
                    {genre.genre}
                  </Text>

                  <Text size="xs" c="dimmed" mt={6}>
                    Total views
                  </Text>

                  <Text size="sm" fw={700} c="brand.4">
                    {genre.views.toLocaleString()}
                  </Text>

                  <Text size="xs" c="dimmed" mt={6}>
                    Watch time
                  </Text>

                  <Text size="sm" fw={700} c="white">
                    {formatWatchTime(genre.watchTime)}
                  </Text>
                </div>
              );
            },
          }}
        />

        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            #1{" "}
            <Text component="span" c="white" fw={600}>
              {chartData[0]?.genre}
            </Text>
          </Text>

          <Text size="xs" c="dimmed">
            <Text component="span" c="brand.4" fw={600}>
              {chartData[0]?.views.toLocaleString()}
            </Text>{" "}
            views
          </Text>
        </Group>
      </Stack>
    </DashboardCard>
  );
}
