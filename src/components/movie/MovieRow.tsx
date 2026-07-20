import { Group, ScrollArea, Stack, Title } from "@mantine/core";
import { useCatalog } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { MovieDiscoverMoreCard } from "~/components/movie/MovieDiscoverMoreCard";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import type { CatalogFilters } from "~/features/catalog/catalog.types";
import type { Genre } from "~/features/genres/genres.types";

const CARD_WIDTH = 160;

type MovieRowProps = {
  title: string;
  filters: CatalogFilters;
  genres: Genre[];
  onDiscoverMore?: () => void;
};

export function MovieRow({ title, filters, genres, onDiscoverMore }: MovieRowProps) {
  const { data, isLoading, isError } = useCatalog(filters);

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isError || !data || data.results.length === 0) {
    return null;
  }

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <ScrollArea type="auto" scrollbarSize={6} offsetScrollbars my={-70}>
        <Group gap="md" wrap="nowrap" py={70}>
          {data.results.map((movie) => (
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
              />
            </div>
          ))}
          {onDiscoverMore && (
            <div style={{ width: CARD_WIDTH, flexShrink: 0 }}>
              <MovieDiscoverMoreCard onClick={onDiscoverMore} />
            </div>
          )}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
