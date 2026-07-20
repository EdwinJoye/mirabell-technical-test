import { AspectRatio, Center, Image, Text } from "@mantine/core";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
};

export function MovieCard({ id, title, posterPath }: MovieCardProps) {
  return (
    <AspectRatio ratio={2 / 3} data-movie-id={id}>
      {posterPath ? (
        <Image src={getTmdbImageUrl(posterPath)} alt={title} radius="md" fit="cover" />
      ) : (
        <Center bg="dark.6" className="rounded-md">
          <Text size="sm" c="dimmed">
            No poster
          </Text>
        </Center>
      )}
    </AspectRatio>
  );
}
