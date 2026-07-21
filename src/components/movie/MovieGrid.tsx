import { Center, Loader, Stack, Title } from "@mantine/core";
import { useElementSize, useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { useInfiniteCatalog, useInfiniteCatalogSearch } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { CARD_WIDTH } from "~/components/movie/movie.styles";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import type { CatalogFilters } from "~/features/catalog/catalog.types";
import type { Genre } from "~/features/genres/genres.types";

const GRID_GAP = 16;

type MovieGridProps = {
  title: string;
  filters: CatalogFilters;
  searchQuery?: string;
  genres: Genre[];
};

export function MovieGrid({ title, filters, searchQuery = "", genres }: MovieGridProps) {
  const isSearching = searchQuery.trim().length > 0;
  const { ref: sentinelRef, entry } = useIntersection({ threshold: 0.1 });
  const { ref: gridRef, width: gridWidth } = useElementSize();

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
  const columns =
    gridWidth > 0 ? Math.max(1, Math.floor((gridWidth + GRID_GAP) / (CARD_WIDTH + GRID_GAP))) : 1;

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_WIDTH}px, 1fr))`,
          gap: "var(--mantine-spacing-md)",
        }}
      >
        {movies.map((movie, index) => {
          const columnIndex = index % columns;
          const zoomOrigin =
            columnIndex === 0 ? "left" : columnIndex === columns - 1 ? "right" : "center";

          return (
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
              zoomOrigin={zoomOrigin}
            />
          );
        })}
      </div>
      {hasNextPage && (
        <Center ref={sentinelRef} py="md">
          <Loader size="sm" color="brand" />
        </Center>
      )}
    </Stack>
  );
}
