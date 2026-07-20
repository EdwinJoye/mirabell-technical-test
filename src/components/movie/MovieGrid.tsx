import { SimpleGrid, Title, Stack } from "@mantine/core";
import { useCatalog, useCatalogSearch } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import type { CatalogFilters } from "~/features/catalog/catalog.types";

type MovieGridProps = {
  title: string;
  filters: CatalogFilters;
  searchQuery?: string;
};

export function MovieGrid({ title, filters, searchQuery = "" }: MovieGridProps) {
  const isSearching = searchQuery.trim().length > 0;
  const {
    data: catalogData,
    isLoading: isCatalogLoading,
    isError: isCatalogError,
  } = useCatalog(filters, !isSearching);
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useCatalogSearch(searchQuery, filters.page, isSearching);

  const data = isSearching ? searchData : catalogData;
  const isLoading = isSearching ? isSearchLoading : isCatalogLoading;
  const isError = isSearching ? isSearchError : isCatalogError;

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isError || !data) {
    return <Title order={3}>Une erreur est survenue lors du chargement des films.</Title>;
  }

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
        {data.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            voteAverage={movie.vote_average}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
