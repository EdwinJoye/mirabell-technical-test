import { ActionIcon, Badge, Group, Stack } from "@mantine/core";
import { CheckIcon, PlayIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { glassActionIconStyles, glassBadgeStyles } from "~/components/movie/movie.styles";
import type { Genre } from "~/features/genres/genres.types";

type MovieCardHoverDetailsProps = {
  genres: Genre[];
};

export function MovieCardHoverDetails({ genres }: MovieCardHoverDetailsProps) {
  return (
    <Stack gap={6}>
      <Group gap={6}>
        <ActionIcon radius="xl" size="sm" variant="filled" c="dark.9" bg="white">
          <PlayIcon size={12} weight="fill" />
        </ActionIcon>
        <ActionIcon radius="xl" size="sm" variant="filled" c="white" styles={glassActionIconStyles}>
          <CheckIcon size={12} />
        </ActionIcon>
        <ActionIcon radius="xl" size="sm" variant="filled" c="white" styles={glassActionIconStyles}>
          <ThumbsUpIcon size={12} />
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
