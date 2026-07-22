import { Box, Group } from "@mantine/core";
import { MoviePosterCard } from "~/components/dashboard/MoviePosterCard";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";

type MoviePosterRowProps = {
  tmdbMovieId: number;
};

export function MoviePosterRow({ tmdbMovieId }: MoviePosterRowProps) {
  const { data: movieDetails } = useMovieDetails(tmdbMovieId);

  if (!movieDetails) {
    return null;
  }

  return (
    <Group align="flex-start">
      <Box w={{ base: "100%", sm: 380 }}>
        <MoviePosterCard
          title={movieDetails.title}
          backdropPath={movieDetails.backdrop_path}
          releaseDate={movieDetails.release_date}
          voteAverage={movieDetails.vote_average}
        />
      </Box>
    </Group>
  );
}
