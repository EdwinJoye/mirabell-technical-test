import { Center, Loader, Stack, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCatalogPages, useCatalogSearchPages } from "~/features/catalog/catalog.hooks";
import { MovieCard } from "~/components/movie/MovieCard";
import { CARD_WIDTH } from "~/components/movie/movie.styles";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import type { CatalogFilters } from "~/features/catalog/catalog.types";
import type { Genre } from "~/features/genres/genres.types";

const GRID_GAP = 16;
const REVEAL_BATCH_SIZE = 20;
const MIN_COLUMNS = 2;
const MIN_WIDTH_FOR_MIN_COLUMNS = CARD_WIDTH * MIN_COLUMNS + GRID_GAP * (MIN_COLUMNS - 1);

type MovieGridProps = {
  title: string;
  filters: CatalogFilters;
  searchQuery?: string;
  genres: Genre[];
  bottomReachedCount?: number;
};

export function MovieGrid({
  title,
  filters,
  searchQuery = "",
  genres,
  bottomReachedCount = 0,
}: MovieGridProps) {
  const isSearching = searchQuery.trim().length > 0;
  const { ref: gridRef, width: gridWidth } = useElementSize();
  const cardWidth =
    gridWidth > 0 && gridWidth < MIN_WIDTH_FOR_MIN_COLUMNS
      ? Math.floor((gridWidth - GRID_GAP * (MIN_COLUMNS - 1)) / MIN_COLUMNS)
      : CARD_WIDTH;
  const columns =
    gridWidth > 0 ? Math.max(1, Math.floor((gridWidth + GRID_GAP) / (cardWidth + GRID_GAP))) : 1;

  const {
    movies: catalogMovies,
    isLoading: isCatalogLoading,
    isError: isCatalogError,
  } = useCatalogPages(filters, !isSearching);

  const {
    movies: searchMovies,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useCatalogSearchPages(searchQuery, isSearching);

  const movies = isSearching ? searchMovies : catalogMovies;
  const isLoading = isSearching ? isSearchLoading : isCatalogLoading;
  const isError = isSearching ? isSearchError : isCatalogError;

  const rowAlignedCount = movies.length - (movies.length % columns);
  const rowAlignedMovies = movies.slice(0, rowAlignedCount);

  const [visibleCount, setVisibleCount] = useState(REVEAL_BATCH_SIZE);
  const hasMoreToReveal = visibleCount < rowAlignedMovies.length;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setVisibleCount((count) => Math.min(count + REVEAL_BATCH_SIZE, rowAlignedMovies.length));
  }, [bottomReachedCount, rowAlignedMovies.length]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CenteredLoader />
      </div>
    );
  }

  if (isError) {
    return <Title order={3}>An error occurred while loading movies.</Title>;
  }

  const visibleMovies = rowAlignedMovies.slice(0, visibleCount);

  return (
    <Stack gap="md">
      <Title order={3}>{title}</Title>
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
          gap: "var(--mantine-spacing-md)",
        }}
      >
        {visibleMovies.map((movie, index) => {
          const columnIndex = index % columns;
          const zoomOrigin =
            columnIndex === 0 ? "left" : columnIndex === columns - 1 ? "right" : "center";

          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: columnIndex * 0.08 }}
            >
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
                zoomOrigin={zoomOrigin}
              />
            </motion.div>
          );
        })}
      </div>
      {hasMoreToReveal && (
        <Center py="md">
          <Loader size="sm" color="brand" />
        </Center>
      )}
    </Stack>
  );
}
