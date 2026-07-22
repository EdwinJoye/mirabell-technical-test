import { Divider, Flex, Stack, Title } from "@mantine/core";
import { MovieGeoDistributionCard } from "./MovieGeoDistributionCard";

type MovieInsightsRowProps = {
  tmdbMovieId: number;
};

export function MovieInsightsRow({ tmdbMovieId }: MovieInsightsRowProps) {
  return (
    <Stack gap="md">
      <Flex align="center" gap="sm">
        <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} hiddenFrom="sm" />
        <Title order={3} size="h5" c="white">
          Global Reach
        </Title>
        <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} />
      </Flex>
      <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
        <div className="sm:flex-1">
          <MovieGeoDistributionCard tmdbMovieId={tmdbMovieId} />
        </div>
      </Flex>
    </Stack>
  );
}
