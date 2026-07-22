import { Flex } from "@mantine/core";
import { MovieGeoDistributionCard } from "./MovieGeoDistributionCard";

type MovieInsightsRowProps = {
  tmdbMovieId: number;
};

export function MovieInsightsRow({ tmdbMovieId }: MovieInsightsRowProps) {
  return (
    <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
      <div className="sm:flex-1">
        <MovieGeoDistributionCard tmdbMovieId={tmdbMovieId} />
      </div>
    </Flex>
  );
}
