import { SimpleGrid, Title } from "@mantine/core";
import { MovieTotalViewsCard } from "~/components/dashboard/movie/MovieTotalViewsCard";
import { MovieUniqueViewersCard } from "~/components/dashboard/movie/MovieUniqueViewersCard";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { MovieReactionsCard } from "./MovieReactionsCard";

type MovieStatsRowProps = {
  tmdbMovieId: number;
};

export function MovieStatsRow({ tmdbMovieId }: MovieStatsRowProps) {
  const movieData = getMovieDashboardData(tmdbMovieId);

  if (!movieData) {
    return <Title order={4}>No analytics data available for this movie.</Title>;
  }

  const { stats, viewsEvolution, reactions } = movieData;

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      <MovieTotalViewsCard stats={stats} viewsEvolution={viewsEvolution} />
      <MovieUniqueViewersCard stats={stats} />
      <MovieReactionsCard reactions={reactions} />
    </SimpleGrid>
  );
}
