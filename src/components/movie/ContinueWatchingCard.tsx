import { AspectRatio, Button, Center, Progress, Stack, Text } from "@mantine/core";
import { PlayIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import { HOVER_EXPAND_DELAY_MS } from "~/components/movie/movie.styles";
import { buttonHoverVars } from "~/lib/theme/hover";

function formatRemainingTime(runtime: number, progressRatio: number): string {
  const remainingMinutes = Math.round(runtime * (1 - progressRatio));
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}min restantes` : `${minutes}min restantes`;
}

type ContinueWatchingCardProps = {
  tmdbMovieId: number;
  progressRatio: number;
  zoomOrigin?: "left" | "center" | "right";
};

export function ContinueWatchingCard({
  tmdbMovieId,
  progressRatio,
  zoomOrigin = "center",
}: ContinueWatchingCardProps) {
  const { data: movie, isLoading, isError } = useMovieDetails(tmdbMovieId);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function handleMouseEnter() {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverExpanded(true);
    }, HOVER_EXPAND_DELAY_MS);
  }

  function handleMouseLeave() {
    clearTimeout(hoverTimeoutRef.current);
    setIsHoverExpanded(false);
  }

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 ease-out ${
        isHoverExpanded
          ? "scale-125 z-150 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85)]"
          : "scale-100"
      }`}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--mantine-color-dark-6)",
        transformOrigin: zoomOrigin,
      }}
    >
      <div>
        <div
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
          style={{
            backgroundColor: isHoverExpanded ? "rgba(0, 0, 0, 0.25)" : undefined,
            backdropFilter: isHoverExpanded ? "blur(0.5px)" : undefined,
            WebkitBackdropFilter: isHoverExpanded ? "blur(0.5px)" : undefined,
            transition: "background-color 400ms ease, backdrop-filter 400ms ease",
          }}
        />
        <Center pos="absolute" style={{ inset: 0 }}>
          {isHoverExpanded ? (
            <Button
              leftSection={<PlayIcon size={14} weight="fill" />}
              radius="xl"
              size="xs"
              color="white"
              c="dark.9"
              style={buttonHoverVars()}
            >
              Resume
            </Button>
          ) : (
            <PlayIcon size={28} weight="fill" color="white" />
          )}
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
