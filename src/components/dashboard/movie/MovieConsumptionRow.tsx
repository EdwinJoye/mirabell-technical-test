import { Divider, Flex, Stack, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { MovieAudienceLoyaltyCard } from "~/components/dashboard/movie/MovieAudienceLoyaltyCard";
import { MovieMomentumCard } from "~/components/dashboard/movie/MovieMomentumCard";
import { MovieOfflineViewsCard } from "~/components/dashboard/movie/MovieOfflineViewsCard";

type MovieConsumptionRowProps = {
  tmdbMovieId: number;
};

export function MovieConsumptionRow({ tmdbMovieId }: MovieConsumptionRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} hiddenFrom="sm" />
          <Title order={3} size="h5" c="white">
            Engagement Deep Dive
          </Title>
          <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} />
        </Flex>
        <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
          <div className="sm:flex-1">
            <MovieOfflineViewsCard tmdbMovieId={tmdbMovieId} />
          </div>
          <div className="sm:flex-1">
            <MovieAudienceLoyaltyCard tmdbMovieId={tmdbMovieId} />
          </div>
          <div className="sm:flex-1">
            <MovieMomentumCard tmdbMovieId={tmdbMovieId} />
          </div>
        </Flex>
      </Stack>
    </motion.div>
  );
}
