import { ActionIcon, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { FilmSlateIcon, InfoIcon, TrophyIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dashboardCardGradient } from "~/components/dashboard/dashboard.styles";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";
import { useMoviesDetails } from "~/features/movie-details/movie-details.hooks";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { getHoverIconColor } from "~/lib/theme/hover";
import { BRAND_COLOR } from "~/lib/theme/theme";

const Y_AXIS_WIDTH = 170;
const POSTER_WIDTH = 18;
const POSTER_HEIGHT = 26;
const MAX_TITLE_LENGTH = 20;
const LEFT_OFFSET = 12;

type ChartMovie = {
  tmdbMovieId: number;
  title: string;
  views: number;
  viewers: number;
  posterPath: string | null;
  backdropPath: string | null;
};

function truncateTitle(title: string): string {
  return title.length > MAX_TITLE_LENGTH ? `${title.slice(0, MAX_TITLE_LENGTH - 1)}…` : title;
}

type YAxisTickProps = {
  x?: number | string;
  y?: number | string;
  index?: number;
  payload?: { value: string };
  movies: ChartMovie[];
};

function TopMoviesYAxisTick({ x = 0, y = 0, index = 0, payload, movies }: YAxisTickProps) {
  const navigate = useNavigate();
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const tickX = Number(x);
  const tickY = Number(y);
  const movie = movies[index];
  const posterUrl = movie?.posterPath ? getTmdbImageUrl(movie.posterPath, "w200") : null;
  const posterPreviewUrl = movie?.posterPath ? getTmdbImageUrl(movie.posterPath, "w300") : null;
  const posterX = tickX - Y_AXIS_WIDTH + LEFT_OFFSET;
  const posterY = tickY - POSTER_HEIGHT / 2;

  function handleViewMovie() {
    if (movie) {
      void navigate(`/dashboard?view=movie&movieId=${movie.tmdbMovieId}`);
    }
  }

  return (
    <g>
      {posterUrl && (
        <Tooltip
          label={
            <div
              style={{
                position: "relative",
                width: 170,
                height: 255,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={posterPreviewUrl ?? posterUrl}
                alt={movie?.title}
                width={170}
                height={255}
                style={{ display: "block", objectFit: "cover" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 55%)",
                }}
              />
              <Text
                size="sm"
                fw={600}
                c="white"
                ta="center"
                lineClamp={2}
                style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}
              >
                {movie?.title}
              </Text>
            </div>
          }
          withArrow
          position="right"
          styles={{
            tooltip: {
              padding: 0,
              backgroundColor: "transparent",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.55)",
            },
          }}
        >
          <image
            href={posterUrl}
            x={posterX}
            y={posterY}
            width={POSTER_WIDTH}
            height={POSTER_HEIGHT}
            clipPath="inset(0% round 4px)"
            preserveAspectRatio="xMidYMid slice"
            style={{ cursor: "pointer" }}
          />
        </Tooltip>
      )}
      <text
        x={tickX - Y_AXIS_WIDTH + LEFT_OFFSET + POSTER_WIDTH + 8}
        y={tickY}
        dy={4}
        textAnchor="start"
        fontSize={12}
        fill={isTitleHovered ? "var(--mantine-color-white)" : "var(--mantine-color-dimmed)"}
        style={{ cursor: "pointer" }}
        onClick={handleViewMovie}
        onMouseEnter={() => setIsTitleHovered(true)}
        onMouseLeave={() => setIsTitleHovered(false)}
      >
        {payload ? truncateTitle(payload.value) : ""}
      </text>
    </g>
  );
}

export function TopWatchedMoviesCard() {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const { stats, topWatchedMovies: movies } = getGlobalDashboardData();
  const topMovies = movies.slice(0, 10);
  const { data: movieDetailsList } = useMoviesDetails(topMovies.map((movie) => movie.tmdbMovieId));

  const chartData: ChartMovie[] = topMovies.map((movie, index) => ({
    tmdbMovieId: movie.tmdbMovieId,
    title: movie.movieTitle,
    views: movie.totalViews,
    viewers: movie.uniqueViewers,
    posterPath: movieDetailsList[index]?.poster_path ?? null,
    backdropPath: movieDetailsList[index]?.backdrop_path ?? null,
  }));

  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <FilmSlateIcon size={16} color={BRAND_COLOR} />
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
          {movies.length}
        </Text>
        <Text size="xs" c="dimmed">
          Most watched movies this {stats.period}
        </Text>

        <BarChart
          h={320}
          mt="sm"
          barChartProps={{ accessibilityLayer: false }}
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
            width: Y_AXIS_WIDTH,
            tickLine: false,
            axisLine: false,
            interval: 0,
            tick: (props) => <TopMoviesYAxisTick {...props} movies={chartData} />,
          }}
          tooltipProps={{
            content: ({ payload }) => {
              if (!payload?.length) {
                return null;
              }
              const movie = payload[0].payload as ChartMovie;
              const backdropUrl = movie.backdropPath
                ? getTmdbImageUrl(movie.backdropPath, "w300")
                : null;
              return (
                <div
                  style={{
                    background: "var(--mantine-color-dark-7)",
                    border: "1px solid var(--mantine-color-dark-4)",
                    borderRadius: 8,
                    overflow: "hidden",
                    width: 220,
                  }}
                >
                  {backdropUrl && (
                    <div style={{ position: "relative" }}>
                      <img
                        src={backdropUrl}
                        alt={movie.title}
                        style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent 55%)",
                        }}
                      />
                      <Text
                        size="sm"
                        fw={600}
                        c="white"
                        lineClamp={1}
                        style={{ position: "absolute", bottom: 8, left: 10, right: 10 }}
                      >
                        {movie.title}
                      </Text>
                    </div>
                  )}
                  <div style={{ padding: "10px 14px" }}>
                    <Text size="xs" c="dimmed">
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
                </div>
              );
            },
          }}
        />

        <Group justify="space-between">
          <Group gap={6}>
            <TrophyIcon size={14} weight="fill" color="var(--mantine-color-yellow-4)" />
            <Text size="xs" c="dimmed">
              #1{" "}
              <Text component="span" c="white" fw={600}>
                {movies[0]?.movieTitle}
              </Text>
            </Text>
          </Group>
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
