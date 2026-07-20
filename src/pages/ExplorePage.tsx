import { Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { MovieGrid } from "~/components/movie/MovieGrid";
import { ExploreToolbar } from "~/components/explore/ExploreToolbar";
import { ExploreHero } from "~/components/explore/ExploreHero";
import { useGenres } from "~/features/genres/genres.hooks";
import { useCatalog } from "~/features/catalog/catalog.hooks";

export function ExplorePage() {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const { data: genresData } = useGenres();
  const { data: catalogData } = useCatalog({ page: 1, sortBy: "popularity.desc" });
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 400);

  const isSearching = debouncedSearchValue.trim().length > 0;

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
        categoryValue={categoryValue}
        onCategoryChange={setCategoryValue}
        categoryOptions={categoryOptions}
        categoryDisabled={isSearching}
      />
      {featuredMovie && !isSearching && (
        <ExploreHero movie={featuredMovie} genres={genresData?.genres ?? []} />
      )}
      <MovieGrid
        title={isSearching ? `Résultats pour "${debouncedSearchValue.trim()}"` : "You might like"}
        searchQuery={debouncedSearchValue}
        genres={genresData?.genres ?? []}
        filters={{
          page: 1,
          sortBy: "popularity.desc",
          withGenres: categoryValue ? [Number(categoryValue)] : undefined,
        }}
      />
    </Stack>
  );
}
