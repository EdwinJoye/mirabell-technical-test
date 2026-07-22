import { AspectRatio, Badge, Center, Group, Stack, Text, Modal } from "@mantine/core";
import { StarIcon } from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { MovieDetailsOverlay } from "~/components/movie/MovieDetailsOverlay";
import { MovieCardHoverDetails } from "~/components/movie/MovieCardHoverDetails";
import { glassBadgeStyles, HOVER_EXPAND_DELAY_MS } from "~/components/movie/movie.styles";
import { useMovieDetails } from "~/features/movie-details/movie-details.hooks";
import type { Genre } from "~/features/genres/genres.types";

function formatRuntime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
  genres: Genre[];
  zoomOrigin?: "left" | "center" | "right";
};

export function MovieCard({
  id,
  title,
  posterPath,
  backdropPath,
  overview,
  releaseDate,
  voteAverage,
  genreIds,
  genres = [],
  zoomOrigin = "center",
}: MovieCardProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const movieGenres = genres.filter((genre) => genreIds.includes(genre.id));
  const { data: movieDetails } = useMovieDetails(id);

  function handleMouseEnter() {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverExpanded(true);
    }, HOVER_EXPAND_DELAY_MS);
  }

  function handleMouseLeave() {
    clearTimeout(hoverTimeoutRef.current);
    setIsHoverExpanded(false);
  }

  return (
    <>
      <AspectRatio
        ratio={2 / 3}
        data-movie-id={id}
        pos="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`rounded-2xl overflow-hidden group cursor-pointer transition-transform duration-500 ease-out ${
          isHoverExpanded ? "scale-125 z-150 shadow-[0_60px_180px_10px_rgba(0,0,0,1)]" : "scale-100"
        }`}
        style={{
          backgroundColor: "var(--mantine-color-dark-6)",
          transformOrigin: zoomOrigin,
        }}
      >
        <div>
          {posterPath ? (
            <img
              src={getTmdbImageUrl(posterPath)}
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
          ) : (
            <Center h="100%">
              <Text size="sm" c="dimmed">
                No poster
              </Text>
            </Center>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
          {voteAverage >= 8 && (
            <Center
              pos="absolute"
              top={8}
              right={8}
              w={26}
              h={26}
              style={{
                ...glassBadgeStyles.root,
                zIndex: 1,
                borderRadius: "50%",
              }}
            >
              <StarIcon size={14} weight="fill" color="var(--mantine-color-yellow-4)" />
            </Center>
          )}
          <Stack gap={6} pos="absolute" bottom={0} left={0} right={0} p="sm" style={{ zIndex: 1 }}>
            {isHoverExpanded && (
              <MovieCardHoverDetails movieId={id} genres={movieGenres} onOpenDetails={open} />
            )}
            <Text fw={600} c="white" size="sm" lineClamp={1}>
              {title}
            </Text>
            <Group gap="xs">
              {releaseYear && (
                <Text size="xs" c="dimmed">
                  {releaseYear}
                </Text>
              )}
              {movieDetails?.runtime && (
                <Text size="xs" c="dimmed">
                  {formatRuntime(movieDetails.runtime)}
                </Text>
              )}
              <Badge
                leftSection={<StarIcon size={10} weight="fill" />}
                variant="filled"
                tt="none"
                fw={500}
                size="sm"
                styles={glassBadgeStyles}
              >
                {voteAverage.toFixed(1)}
              </Badge>
            </Group>
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
          title={title}
          backdropPath={backdropPath}
          overview={overview}
          releaseYear={releaseYear}
          voteAverage={voteAverage}
          genreIds={genreIds}
          genres={genres}
          onClose={close}
        />
      </Modal>
    </>
  );
}
