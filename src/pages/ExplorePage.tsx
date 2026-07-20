import { Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { MovieGrid } from "~/components/movie/MovieGrid";
import { ExploreToolbar } from "~/components/explore/ExploreToolbar";
import { useGenres } from "~/features/genres/genres.hooks";

export function ExplorePage() {
  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const { data: genresData } = useGenres();
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 400);

  const isSearching = debouncedSearchValue.trim().length > 0;

  const categoryOptions =
    genresData?.genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })) ?? [];

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
      <MovieGrid
        title={isSearching ? `Résultats pour "${debouncedSearchValue.trim()}"` : "You might like"}
        searchQuery={debouncedSearchValue}
        filters={{
          page: 1,
          sortBy: "popularity.desc",
          withGenres: categoryValue ? [Number(categoryValue)] : undefined,
        }}
      />
    </Stack>
  );
}
