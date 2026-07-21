import { AspectRatio, Center, Progress, Stack, Text } from "@mantine/core";
import { PlayIcon } from "@phosphor-icons/react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";

function formatRemainingTime(runtime: number, progressRatio: number): string {
  const remainingMinutes = Math.round(runtime * (1 - progressRatio));
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}min restantes` : `${minutes}min restantes`;
}

type ContinueWatchingCardProps = {
  tmdbMovieId: number;
  progressRatio: number;
};

export function ContinueWatchingCard({ tmdbMovieId, progressRatio }: ContinueWatchingCardProps) {
  const { data: movie, isLoading, isError } = useMovieDetails(tmdbMovieId);

  if (isLoading || isError || !movie) {
    return null;
  }

  const backgroundImageUrl = movie.backdrop_path
    ? getTmdbImageUrl(movie.backdrop_path, "w300")
    : undefined;

  return (
    <AspectRatio
      ratio={16 / 9}
      pos="relative"
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--mantine-color-dark-6)",
      }}
    >
      <div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        <Center pos="absolute" style={{ inset: 0 }}>
          <PlayIcon size={28} weight="fill" color="white" />
        </Center>
        <Stack gap={4} pos="absolute" bottom={0} left={0} right={0} p="sm" style={{ zIndex: 1 }}>
          <Text fw={600} c="white" size="sm" lineClamp={1}>
            {movie.title}
          </Text>
          {movie.runtime && (
            <Text size="xs" c="dimmed">
              {formatRemainingTime(movie.runtime, progressRatio)}
            </Text>
          )}
          <Progress value={progressRatio * 100} size="xs" color="brand" />
        </Stack>
      </div>
    </AspectRatio>
  );
}
