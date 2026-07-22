import { ActionIcon, Badge, Group, Stack, Text, Title, Button } from "@mantine/core";
import { XIcon, DownloadSimpleIcon, StarIcon } from "@phosphor-icons/react";
import { WatchNowButton } from "~/components/ui/WatchNowButton";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { buttonHoverVars, glassActionIconVars } from "~/lib/theme/hover";
import { glassBadgeStyles } from "~/components/movie/movie.styles";
import type { Genre } from "~/features/genres/genres.types";

type MovieDetailsOverlayProps = {
  title: string;
  backdropPath: string | null;
  overview: string;
  releaseYear: number | null;
  voteAverage: number;
  genreIds: number[];
  genres: Genre[];
  onClose: () => void;
};

export function MovieDetailsOverlay({
  title,
  backdropPath,
  overview,
  releaseYear,
  voteAverage,
  genreIds,
  genres = [],
  onClose,
}: MovieDetailsOverlayProps) {
  const movieGenres = genres.filter((genre) => genreIds.includes(genre.id));
  const backgroundImageUrl = backdropPath ? getTmdbImageUrl(backdropPath, "w780") : undefined;

  return (
    <div
      className="relative bg-cover bg-center min-h-100"
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
        backgroundColor: "var(--mantine-color-dark-6)",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10" />
      <ActionIcon
        onClick={onClose}
        aria-label="Close"
        variant="filled"
        radius="xl"
        pos="absolute"
        top={16}
        right={16}
        style={{ ...glassActionIconVars(), zIndex: 2 }}
      >
        <XIcon size={18} color="white" />
      </ActionIcon>
      <Stack gap="md" pos="absolute" bottom={0} left={0} right={0} p="xl" style={{ zIndex: 1 }}>
        <Group gap="xs">
          {releaseYear && (
            <Text size="sm" c="dimmed">
              {releaseYear}
            </Text>
          )}
          <Badge
            leftSection={<StarIcon size={10} weight="fill" />}
            tt="none"
            fw={500}
            styles={glassBadgeStyles}
          >
            {voteAverage.toFixed(1)}
          </Badge>
        </Group>
        <Title order={2} c="white">
          {title}
        </Title>
        <Group gap="xs">
          {movieGenres.map((genre) => (
            <Badge key={genre.id} tt="none" fw={500} c="white" styles={glassBadgeStyles}>
              {genre.name}
            </Badge>
          ))}
        </Group>
        <Text c="dimmed" lineClamp={4}>
          {overview}
        </Text>
        <Group gap="sm">
          <WatchNowButton />
          <Button
            leftSection={<DownloadSimpleIcon size={18} />}
            variant="filled"
            color="dark.9"
            c="white"
            radius="xl"
            style={buttonHoverVars()}
          >
            Download
          </Button>
        </Group>
      </Stack>
    </div>
  );
}
