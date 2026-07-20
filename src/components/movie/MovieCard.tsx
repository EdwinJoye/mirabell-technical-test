import { AspectRatio, Badge, Center, Group, Stack, Text } from "@mantine/core";
import { StarIcon } from "@phosphor-icons/react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
};

export function MovieCard({ id, title, posterPath, releaseDate, voteAverage }: MovieCardProps) {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <AspectRatio
      ratio={2 / 3}
      data-movie-id={id}
      pos="relative"
      className="rounded-md overflow-hidden"
      style={{
        backgroundImage: posterPath ? `url(${getTmdbImageUrl(posterPath)})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--mantine-color-dark-6)",
      }}
    >
      <div>
        {!posterPath && (
          <Center h="100%">
            <Text size="sm" c="dimmed">
              No poster
            </Text>
          </Center>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
        <Stack gap={4} pos="absolute" bottom={0} left={0} right={0} p="sm" style={{ zIndex: 1 }}>
          <Text fw={600} c="white" size="sm" lineClamp={1}>
            {title}
          </Text>
          <Group gap="xs">
            {releaseYear && (
              <Text size="xs" c="dimmed">
                {releaseYear}
              </Text>
            )}
            <Badge
              leftSection={<StarIcon size={10} weight="fill" />}
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={{
                root: {
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                },
              }}
            >
              {voteAverage.toFixed(1)}
            </Badge>
          </Group>
        </Stack>
      </div>
    </AspectRatio>
  );
}
