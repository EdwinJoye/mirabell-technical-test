import { ActionIcon, Badge, Group, Stack } from "@mantine/core";
import { CheckIcon, MagnifyingGlassPlusIcon, PlayIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { glassBadgeStyles } from "~/components/movie/movie.styles";
import { actionIconHoverVars, glassActionIconVars } from "~/lib/theme/hover";
import { useWatchStatusStore } from "~/features/watch-status/watch-status.store";
import type { CSSProperties } from "react";
import type { Genre } from "~/features/genres/genres.types";

type MovieCardHoverDetailsProps = {
  movieId: number;
  genres: Genre[];
  onOpenDetails: () => void;
};

export function MovieCardHoverDetails({
  movieId,
  genres,
  onOpenDetails,
}: MovieCardHoverDetailsProps) {
  const likedMovieIds = useWatchStatusStore((state) => state.likedMovieIds);
  const watchedMovieIds = useWatchStatusStore((state) => state.watchedMovieIds);
  const toggleLiked = useWatchStatusStore((state) => state.toggleLiked);
  const toggleWatched = useWatchStatusStore((state) => state.toggleWatched);

  const isLiked = likedMovieIds.includes(movieId);
  const isWatched = watchedMovieIds.includes(movieId);

  function handleWatchedClick(event: React.MouseEvent) {
    event.stopPropagation();
    toggleWatched(movieId);
  }

  function handleLikedClick(event: React.MouseEvent) {
    event.stopPropagation();
    toggleLiked(movieId);
  }

  function handleOpenDetailsClick(event: React.MouseEvent) {
    event.stopPropagation();
    onOpenDetails();
  }

  function activeVars(): CSSProperties {
    return { ...actionIconHoverVars(), "--ai-bg": "var(--mantine-color-brand-6)" } as CSSProperties;
  }

  return (
    <Stack gap={6}>
      <Group justify="space-between">
        <Group gap={6}>
          <ActionIcon
            radius="xl"
            size="sm"
            variant="filled"
            c="dark.9"
            style={{ ...actionIconHoverVars(), "--ai-bg": "var(--mantine-color-white)" }}
          >
            <PlayIcon size={12} weight="fill" />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="sm"
            variant="filled"
            onClick={handleWatchedClick}
            c={isWatched ? "dark.9" : "white"}
            style={isWatched ? activeVars() : glassActionIconVars()}
            aria-label="Marquer comme vu"
            aria-pressed={isWatched}
          >
            <CheckIcon size={12} weight={isWatched ? "bold" : "regular"} />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="sm"
            variant="filled"
            onClick={handleLikedClick}
            c={isLiked ? "dark.9" : "white"}
            style={isLiked ? activeVars() : glassActionIconVars()}
            aria-label="J'aime"
            aria-pressed={isLiked}
          >
            <ThumbsUpIcon size={12} weight={isLiked ? "fill" : "regular"} />
          </ActionIcon>
        </Group>
        <ActionIcon
          radius="xl"
          size="sm"
          variant="filled"
          onClick={handleOpenDetailsClick}
          c="white"
          style={glassActionIconVars()}
          aria-label="Voir plus de détails"
        >
          <MagnifyingGlassPlusIcon size={12} />
        </ActionIcon>
      </Group>

      <Group gap={4}>
        {genres.slice(0, 2).map((genre) => (
          <Badge key={genre.id} tt="none" fw={500} c="white" size="xs" styles={glassBadgeStyles}>
            {genre.name}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
}
