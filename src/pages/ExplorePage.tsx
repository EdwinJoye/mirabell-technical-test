import { Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { MovieGrid } from "~/components/movie/MovieGrid";
import { MovieRow } from "~/components/movie/MovieRow";
import { ExploreToolbar } from "~/components/explore/ExploreToolbar";
import { ExploreHero } from "~/components/explore/ExploreHero";
import { useGenres } from "~/features/genres/genres.hooks";
import { useCatalog } from "~/features/catalog/catalog.hooks";

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlGenre = searchParams.get("genre");
  const showAllRequested = searchParams.get("view") === "all";

  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 400);

  const { data: genresData } = useGenres();
  const { data: catalogData } = useCatalog({ page: 1, sortBy: "popularity.desc" });

  const isSearching = debouncedSearchValue.trim().length > 0;
  const isShowingGrid = isSearching || showAllRequested;

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
        if (value) {
          next.set("genre", value);
        } else {
          next.delete("genre");
        }
        return next;
      },
      { replace: true },
    );
  }

  const categoryOptions =
    genresData?.genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })) ?? [];

  const featuredMovie = catalogData?.results[0];

  return (
    <Stack gap="xl" p="md">
      <ExploreToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        categoryValue={urlGenre}
        onCategoryChange={handleCategoryChange}
        categoryOptions={categoryOptions}
        categoryDisabled={isSearching}
      />
      {featuredMovie && !isShowingGrid && (
        <ExploreHero movie={featuredMovie} genres={genresData?.genres ?? []} />
      )}
      {!isShowingGrid && (
        <MovieRow
          title="You might like"
          genres={genresData?.genres ?? []}
          filters={{
            page: 1,
            sortBy: "popularity.desc",
            withGenres: urlGenre ? [Number(urlGenre)] : undefined,
          }}
        />
      )}
      {isShowingGrid && (
        <MovieGrid
          title={isSearching ? `Résultats pour "${debouncedSearchValue.trim()}"` : "Tous les films"}
          searchQuery={debouncedSearchValue}
          genres={genresData?.genres ?? []}
          filters={{ page: 1, sortBy: "popularity.desc" }}
        />
      )}
    </Stack>
  );
}
