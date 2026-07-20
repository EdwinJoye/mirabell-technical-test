import { Stack } from "@mantine/core";
import { MovieGrid } from "~/components/movie/MovieGrid";

export function ExplorePage() {
  return (
    <Stack gap="xl" p="md">
      <MovieGrid title="You might like" filters={{ page: 1, sortBy: "popularity.desc" }} />
    </Stack>
  );
}
