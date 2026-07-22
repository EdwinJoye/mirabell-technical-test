import { SimpleGrid, Title } from "@mantine/core";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <MovieTotalViewsCard stats={stats} viewsEvolution={viewsEvolution} />
        <MovieUniqueViewersCard stats={stats} />
        <MovieReactionsCard reactions={reactions} />
      </SimpleGrid>
    </motion.div>
  );
}
