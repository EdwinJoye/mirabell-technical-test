import { DEFAULT_THEME, Divider, Flex, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";
import { MoviePosterCard } from "~/components/dashboard/movie/MoviePosterCard";
import { MovieAverageWatchTimeCard } from "~/components/dashboard/movie/MovieAverageWatchTimeCard";
import { MovieDeviceDistributionCard } from "~/components/dashboard/movie/MovieDeviceDistributionCard";
import { MovieRetentionCard } from "~/components/dashboard/movie/MovieRetentionCard";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { theme } from "~/lib/theme/theme";

const MOVIE_POSTER_ROW_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;
const MOBILE_RETENTION_CARD_HEIGHT = 320;

type MoviePosterRowProps = {
  tmdbMovieId: number;
};

export function MoviePosterRow({ tmdbMovieId }: MoviePosterRowProps) {
  const isDesktop = useMediaQuery(`(min-width: ${MOVIE_POSTER_ROW_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });
  const { data: movieDetails } = useMovieDetails(tmdbMovieId);
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!movieDetails || !dashboardData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 2.4fr" : "1fr",
          gridTemplateRows: isDesktop ? "auto 1fr" : "auto",
          gap: "var(--mantine-spacing-md)",
        }}
      >
        <div style={isDesktop ? { gridColumn: 1, gridRow: 1 } : undefined}>
          <MoviePosterCard
            tmdbMovieId={tmdbMovieId}
            title={movieDetails.title}
            backdropPath={movieDetails.backdrop_path}
            releaseDate={movieDetails.release_date}
            voteAverage={movieDetails.vote_average}
            runtime={movieDetails.runtime}
            overview={movieDetails.overview}
            genres={movieDetails.genres}
          />
        </div>

        <div style={isDesktop ? { gridColumn: 1, gridRow: 2 } : undefined}>
          <MovieAverageWatchTimeCard tmdbMovieId={tmdbMovieId} stats={dashboardData.stats} />
        </div>

        <div style={isDesktop ? { gridColumn: 2, gridRow: "1 / 3" } : undefined}>
          <Stack gap="md" h="100%">
            <Flex align="center" gap="sm">
              <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} hiddenFrom="sm" />
              <Title order={3} size="h5" c="white">
                Viewing Insights
              </Title>
              <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} />
            </Flex>
            <Flex
              direction={{ base: "column", sm: "row" }}
              align="stretch"
              gap="md"
              style={{ flex: 1 }}
            >
              <div className="sm:flex-1">
                <MovieDeviceDistributionCard tmdbMovieId={tmdbMovieId} />
              </div>
              <div
                className="sm:flex-3"
                style={
                  isDesktop
                    ? { minWidth: 0 }
                    : { minWidth: 0, height: MOBILE_RETENTION_CARD_HEIGHT }
                }
              >
                <MovieRetentionCard retentionCurve={dashboardData.retentionCurve} />
              </div>
            </Flex>
          </Stack>
        </div>
      </div>
    </motion.div>
  );
}
