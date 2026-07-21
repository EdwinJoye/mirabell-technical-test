import { ScrollArea, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { MovieGrid } from "~/components/movie/MovieGrid";
import { MovieRow } from "~/components/movie/MovieRow";
import { ContinueWatchingRow } from "~/components/movie/ContinueWatchingRow";
import { ExploreToolbar } from "~/components/explore/ExploreToolbar";
import { ExploreHero } from "~/components/explore/ExploreHero";
import { useGenres } from "~/features/genres/genres.hooks";
import { useCatalog } from "~/features/catalog/catalog.hooks";

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlGenre = searchParams.get("genre");
  const showAllRequested = searchParams.get("view") === "all";
  const popularOnly = searchParams.get("popular") === "1";

  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 400);

  const { data: genresData } = useGenres();
  const { data: catalogData } = useCatalog({ page: 1, sortBy: "popularity.desc" });

  const isSearching = debouncedSearchValue.trim().length > 0;
  const isShowingGrid = isSearching || showAllRequested || Boolean(urlGenre) || popularOnly;
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollViewportRef.current?.scrollTo({ top: 0 });
  }, [isShowingGrid]);

  useEffect(() => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (debouncedSearchValue.trim()) {
          next.set("q", debouncedSearchValue.trim());
        } else {
          next.delete("q");
        }
        return next;
      },
      { replace: true },
    );
  }, [debouncedSearchValue, setSearchParams]);

  function handleCategoryChange(value: string | null) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete("genre");
        next.delete("view");
        if (value === "all") {
          next.set("view", "all");
        } else if (value) {
          next.set("genre", value);
        }
        return next;
      },
      { replace: true },
    );
  }

  function handlePopularChange(value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === "popular") {
          next.set("popular", "1");
        } else {
          next.delete("popular");
        }
        return next;
      },
      { replace: true },
    );
  }

  const categoryOptions = [
    { value: "all", label: "All" },
    ...(genresData?.genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })) ?? []),
  ];

  const categoryValue = showAllRequested ? "all" : urlGenre;

  const selectedGenre = genresData?.genres.find((genre) => String(genre.id) === urlGenre);

  const gridTitle = isSearching
    ? `Résultats pour "${debouncedSearchValue.trim()}"`
    : (selectedGenre?.name ?? (popularOnly ? "Films populaires" : "Tous les films"));

  const featuredMovie = catalogData?.results[0];

  return (
    <Stack gap="md" pb="md" pl="md" style={{ height: "calc(100dvh" }}>
      <ExploreToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        categoryValue={categoryValue}
        onCategoryChange={handleCategoryChange}
        categoryOptions={categoryOptions}
        categoryDisabled={isSearching}
        popularValue={popularOnly ? "popular" : "all"}
        onPopularChange={handlePopularChange}
      />

      <ScrollArea type="auto" style={{ flex: 1 }} viewportRef={scrollViewportRef}>
        <Stack gap="md" pb={90}>
          {featuredMovie && !isShowingGrid && (
            <ExploreHero movie={featuredMovie} genres={genresData?.genres ?? []} />
          )}
          {!isShowingGrid && <ContinueWatchingRow />}
          {!isShowingGrid && (
            <MovieRow
              title="You might like"
              genres={genresData?.genres ?? []}
              onDiscoverMore={() => handleCategoryChange("all")}
              filters={{ page: 1, sortBy: "popularity.desc" }}
            />
          )}
          {!isShowingGrid && (
            <MovieRow
              title="Populaires"
              genres={genresData?.genres ?? []}
              filters={{ page: 1, sortBy: "popularity.desc", voteAverageGte: 8 }}
            />
          )}
          {!isShowingGrid &&
            genresData?.genres
              .slice(0, 6)
              .map((genre) => (
                <MovieRow
                  key={genre.id}
                  title={genre.name}
                  genres={genresData.genres}
                  onDiscoverMore={() => handleCategoryChange(String(genre.id))}
                  discoverMoreLabel={`Découvrir plus : ${genre.name}`}
                  filters={{ page: 1, sortBy: "popularity.desc", withGenres: [genre.id] }}
                />
              ))}
          {isShowingGrid && (
            <MovieGrid
              title={gridTitle}
              searchQuery={debouncedSearchValue}
              genres={genresData?.genres ?? []}
              filters={{
                page: 1,
                sortBy: "popularity.desc",
                withGenres: urlGenre ? [Number(urlGenre)] : undefined,
                voteAverageGte: popularOnly ? 8 : undefined,
              }}
            />
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
