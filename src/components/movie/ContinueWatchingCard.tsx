import { AspectRatio, Button, Center, Modal, Progress, Stack, Text } from "@mantine/core";
import { PlayIcon } from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { MovieDetailsOverlay } from "./MovieDetailsOverlay";
import { HOVER_EXPAND_DELAY_MS } from "~/components/movie/movie.styles";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import { buttonHoverVars } from "~/lib/theme/hover";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";

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

  const [opened, { open, close }] = useDisclosure(false);
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

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <>
      <AspectRatio
        ratio={16 / 9}
        pos="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 ease-out ${
          isHoverExpanded ? "scale-125 z-150 shadow-[0_60px_180px_10px_rgba(0,0,0,1)]" : "scale-100"
        }`}
        style={{
          backgroundColor: "var(--mantine-color-dark-6)",
          transformOrigin: zoomOrigin,
        }}
      >
        <div>
          {backgroundImageUrl && (
            <img
              src={backgroundImageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
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
                onClick={open}
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

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        padding={0}
        radius="lg"
        withCloseButton={false}
        centered
        zIndex={300}
      >
        <MovieDetailsOverlay
          tmdbMovieId={tmdbMovieId}
          title={movie.title}
          backdropPath={movie.backdrop_path}
          overview={movie.overview}
          releaseYear={releaseYear}
          voteAverage={movie.vote_average}
          genreIds={movie.genres.map((genre) => genre.id)}
          genres={movie.genres}
          onClose={close}
        />
      </Modal>
    </>
  );
}
