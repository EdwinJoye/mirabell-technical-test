import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import { useCatalog } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { MovieDiscoverMoreCard } from "~/components/movie/MovieDiscoverMoreCard";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import { CARD_WIDTH } from "~/components/movie/movie.styles";
import type { CatalogFilters } from "~/features/catalog/catalog.types";
import type { Genre } from "~/features/genres/genres.types";

type MovieRowProps = {
  title: string;
  filters: CatalogFilters;
  genres: Genre[];
  onDiscoverMore?: () => void;
  discoverMoreLabel?: string;
};

export function MovieRow({
  title,
  filters,
  genres,
  onDiscoverMore,
  discoverMoreLabel,
}: MovieRowProps) {
  const { data, isLoading, isError } = useCatalog(filters);

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isError || !data || data.results.length === 0) {
    return null;
  }

  const lastIndex = data.results.length - 1;

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <ScrollArea type="never" my={-45}>
        <Group gap="md" wrap="nowrap" py={45}>
          {data.results.map((movie, index) => (
            <div key={movie.id} style={{ width: CARD_WIDTH, flexShrink: 0 }}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                backdropPath={movie.backdrop_path}
                overview={movie.overview}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                genreIds={movie.genre_ids}
                genres={genres}
                zoomOrigin={index === 0 ? "left" : index === lastIndex ? "right" : "center"}
              />
            </div>
          ))}
          {onDiscoverMore && (
            <div style={{ width: CARD_WIDTH, flexShrink: 0 }}>
              <MovieDiscoverMoreCard onClick={onDiscoverMore} label={discoverMoreLabel} />
            </div>
          )}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
