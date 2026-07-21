import { Center, Loader, SimpleGrid, Stack, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { useInfiniteCatalog, useInfiniteCatalogSearch } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import type { CatalogFilters } from "~/features/catalog/catalog.types";
import type { Genre } from "~/features/genres/genres.types";

type MovieGridProps = {
  title: string;
  filters: CatalogFilters;
  searchQuery?: string;
  genres: Genre[];
};

export function MovieGrid({ title, filters, searchQuery = "", genres }: MovieGridProps) {
  const isSearching = searchQuery.trim().length > 0;
  const { ref: sentinelRef, entry } = useIntersection({ threshold: 0.1 });

  const {
    data: catalogData,
    isLoading: isCatalogLoading,
    isError: isCatalogError,
    fetchNextPage: fetchNextCatalogPage,
    hasNextPage: hasNextCatalogPage,
    isFetchingNextPage: isFetchingNextCatalogPage,
  } = useInfiniteCatalog(filters, !isSearching);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useInfiniteCatalogSearch(searchQuery, isSearching);

  const data = isSearching ? searchData : catalogData;
  const isLoading = isSearching ? isSearchLoading : isCatalogLoading;
  const isError = isSearching ? isSearchError : isCatalogError;
  const hasNextPage = isSearching ? hasNextSearchPage : hasNextCatalogPage;
  const isFetchingNextPage = isSearching ? isFetchingNextSearchPage : isFetchingNextCatalogPage;
  const fetchNextPage = isSearching ? fetchNextSearchPage : fetchNextCatalogPage;

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <CenteredLoader />;
  }

  if (isError || !data) {
    return <Title order={3}>Une erreur est survenue lors du chargement des films.</Title>;
  }

  const movies = data.pages.flatMap((page) => page.results);

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
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
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Center ref={sentinelRef} py="md">
          <Loader size="sm" color="brand" />
        </Center>
      )}
    </Stack>
  );
}
