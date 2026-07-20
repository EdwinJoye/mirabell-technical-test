import { BackgroundImage, Badge, Button, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { DownloadSimpleIcon, DotsThreeIcon, FireIcon, PlayIcon } from "@phosphor-icons/react";
import type { CSSProperties } from "react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import type { TmdbMovie } from "~/lib/tmdb/tmdb.types";
import type { Genre } from "~/features/genres/genres.types";

const badgeStyles = {
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
};

function hoverVars(): CSSProperties {
  return {
    "--button-hover": "var(--mantine-color-brand-6)",
    "--button-hover-color": "var(--mantine-color-dark-9)",
    transition: "background-color 300ms ease, color 300ms ease",
  } as CSSProperties;
}

type ExploreHeroProps = {
  movie: TmdbMovie;
  genres: Genre[];
};

export function ExploreHero({ movie, genres }: ExploreHeroProps) {
  const movieGenres = genres.filter((genre) => movie.genre_ids.includes(genre.id));
  const backgroundImageUrl = movie.backdrop_path
    ? getTmdbImageUrl(movie.backdrop_path, "original")
    : "";

  return (
    <BackgroundImage
      src={backgroundImageUrl}
      radius="lg"
      pos="relative"
      mih={400}
      style={{ overflow: "hidden", backgroundColor: "var(--mantine-color-dark-6)" }}
    >
      <Flex
        direction="column"
        justify="space-between"
        pos="absolute"
        p="xl"
        maw={512}
        style={{ inset: 0, zIndex: 1 }}
      >
        <Badge
          leftSection={<FireIcon size={14} />}
          variant="filled"
          c="white"
          tt="none"
          fw={500}
          w="fit-content"
          styles={badgeStyles}
        >
          Now Popular
        </Badge>

        <Stack gap="md">
          <Group gap="xs">
            {movieGenres.map((genre) => (
              <Badge
                key={genre.id}
                variant="filled"
                tt="none"
                fw={500}
                c="white"
                w="fit-content"
                styles={badgeStyles}
              >
                {genre.name}
              </Badge>
            ))}
          </Group>
          <Title order={1} c="white">
            {movie.title}
          </Title>
          <Text c="dimmed" lineClamp={3}>
            {movie.overview}
          </Text>
          <Group gap="sm">
            <Button
              leftSection={<PlayIcon size={18} weight="fill" />}
              color="white"
              c="dark.9"
              radius="xl"
              style={hoverVars()}
            >
              Watch Now
            </Button>
            <Button
              leftSection={<DownloadSimpleIcon size={18} />}
              variant="filled"
              color="dark.9"
              c="white"
              radius="xl"
              style={hoverVars()}
            >
              Download
            </Button>
            <Button
              variant="filled"
              color="dark.9"
              c="white"
              radius="xl"
              px="sm"
              style={hoverVars()}
            >
              <DotsThreeIcon size={20} />
            </Button>
          </Group>
        </Stack>
      </Flex>
    </BackgroundImage>
  );
}
