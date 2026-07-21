import { SimpleGrid, Title } from "@mantine/core";
import { MovieAverageWatchTimeCard } from "~/components/dashboard/MovieAverageWatchTimeCard";
import { MovieTotalViewsCard } from "~/components/dashboard/MovieTotalViewsCard";
import { MovieUniqueViewersCard } from "~/components/dashboard/MovieUniqueViewersCard";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";

type MovieStatsRowProps = {
  tmdbMovieId: number;
};

export function MovieStatsRow({ tmdbMovieId }: MovieStatsRowProps) {
  const movieData = getMovieDashboardData(tmdbMovieId);

  if (!movieData) {
    return <Title order={4}>No analytics data available for this movie.</Title>;
  }

  const { stats, viewsEvolution } = movieData;

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      <MovieTotalViewsCard stats={stats} viewsEvolution={viewsEvolution} />
      <MovieUniqueViewersCard stats={stats} />
      <MovieAverageWatchTimeCard tmdbMovieId={tmdbMovieId} stats={stats} />
    </SimpleGrid>
  );
}
