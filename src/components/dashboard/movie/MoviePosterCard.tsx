import { AspectRatio, Badge, Center, Group, Loader, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ClockIcon, StarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";
import { MovieDetailsOverlay } from "~/components/movie/MovieDetailsOverlay";
import { PlayButton } from "~/components/ui/PlayButton";
import type { Genre } from "~/features/genres/genres.types";

type MoviePosterCardProps = {
  title: string;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  runtime?: number | null;
  overview?: string;
  genres?: Genre[];
};

function formatRuntime(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export function MoviePosterCard({
  title,
  backdropPath,
  releaseDate,
  voteAverage,
  runtime,
  overview,
  genres = [],
}: MoviePosterCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const backdropUrl = backdropPath ? getTmdbImageUrl(backdropPath, "w780") : undefined;

  return (
    <AspectRatio
      ratio={16 / 9}
      pos="relative"
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundImage: isImageLoaded && backdropUrl ? `url(${backdropUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--mantine-color-dark-6)",
      }}
    >
      <div>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            style={{ display: "none" }}
            onLoad={() => setIsImageLoaded(true)}
          />
        )}

        {!isImageLoaded && (
          <Center h="100%">
            <Loader size="sm" color="brand" />
          </Center>
        )}

        {isImageLoaded && (
          <>
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

            <Stack gap={2} pos="absolute" top={0} left={0} right={0} p="md" style={{ zIndex: 1 }}>
              <Text fw={700} c="white" size="lg" lineClamp={1} style={{ letterSpacing: -0.3 }}>
                {title}
              </Text>
              {releaseYear && (
                <Text size="sm" c="dimmed">
                  {releaseYear}
                </Text>
              )}
            </Stack>

            <Stack
              gap={6}
              pos="absolute"
              bottom={0}
              left={0}
              right={0}
              p="md"
              style={{ zIndex: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge
                    leftSection={<StarIcon size={12} weight="fill" />}
                    variant="outline"
                    tt="none"
                    fw={500}
                    size="lg"
                    styles={glassBadgeStyles}
                  >
                    {voteAverage.toFixed(1)}
                  </Badge>

                  {runtime && (
                    <Badge
                      leftSection={<ClockIcon size={12} />}
                      variant="outline"
                      tt="none"
                      fw={500}
                      size="lg"
                      styles={glassBadgeStyles}
                    >
                      {formatRuntime(runtime)}
                    </Badge>
                  )}
                </div>

                <Group gap={6}>
                  {overview && <PlayButton onClick={open} ariaLabel="See overview" />}
                  {overview && <InfoTooltip label={overview} width={300} />}
                </Group>
              </div>
            </Stack>
          </>
        )}
      </div>

      {overview && (
        <Modal
          opened={opened}
          onClose={close}
          size="lg"
          padding={0}
          radius="lg"
          withCloseButton={false}
          zIndex={300}
        >
          <MovieDetailsOverlay
            title={title}
            backdropPath={backdropPath}
            overview={overview}
            releaseYear={releaseYear}
            voteAverage={voteAverage}
            genreIds={genres.map((genre) => genre.id)}
            genres={genres}
            onClose={close}
          />
        </Modal>
      )}
    </AspectRatio>
  );
}
