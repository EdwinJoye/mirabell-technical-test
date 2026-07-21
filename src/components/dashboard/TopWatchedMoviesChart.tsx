import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { FilmSlateIcon, InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";

type ChartMovie = {
  title: string;
  views: number;
  viewers: number;
};

export function TopWatchedMoviesChart() {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const { stats, topWatchedMovies: movies } = getGlobalDashboardData();

  const chartData: ChartMovie[] = movies.slice(0, 10).map((movie) => ({
    title: movie.movieTitle,
    views: movie.totalViews,
    viewers: movie.uniqueViewers,
  }));

  return (
    <Card radius="lg" p="lg" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <FilmSlateIcon size={16} color="var(--mantine-color-brand-6)" />

            <Text size="sm" c="dimmed" fw={500}>
              Top Watched Movies
            </Text>
          </Group>

          <Tooltip
            label="Ranks the most watched movies based on total views and unique viewers."
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
          size="2rem"
          fw={700}
          c="white"
          style={{
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {movies.length}
        </Text>

        <Text size="xs" c="dimmed">
          Most watched movies this {stats.period}
        </Text>

        <BarChart
          h={320}
          mt="sm"
          data={chartData}
          dataKey="title"
          series={[
            {
              name: "views",
              color: "brand.6",
            },
          ]}
          orientation="vertical"
          withXAxis
          withYAxis
          withTooltip
          gridAxis="none"
          barProps={{
            radius: 6,
            cursor: "pointer",
          }}
          yAxisProps={{
            width: 170,
            tickLine: false,
            axisLine: false,
          }}
          tooltipProps={{
            content: ({ payload }) => {
              if (!payload?.length) {
                return null;
              }

              const movie = payload[0].payload as ChartMovie;

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
                    {movie.title}
                  </Text>

                  <Text size="xs" c="dimmed" mt={6}>
                    Total views
                  </Text>

                  <Text size="sm" fw={700} c="brand.4">
                    {movie.views.toLocaleString()}
                  </Text>

                  <Text size="xs" c="dimmed" mt={6}>
                    Unique viewers
                  </Text>

                  <Text size="sm" fw={700} c="white">
                    {movie.viewers.toLocaleString()}
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
              {movies[0]?.movieTitle}
            </Text>
          </Text>

          <Text size="xs" c="dimmed">
            <Text component="span" c="brand.4" fw={600}>
              {movies[0]?.totalViews.toLocaleString()}
            </Text>{" "}
            views
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
