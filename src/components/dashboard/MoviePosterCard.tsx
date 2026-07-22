import { AspectRatio, Badge, Group, Stack, Text } from "@mantine/core";
import { StarIcon } from "@phosphor-icons/react";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { glassBadgeStyles } from "~/components/dashboard/dashboard.styles";

type MoviePosterCardProps = {
  title: string;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
};

export function MoviePosterCard({
  title,
  backdropPath,
  releaseDate,
  voteAverage,
}: MoviePosterCardProps) {
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const backdropUrl = backdropPath ? getTmdbImageUrl(backdropPath, "original") : undefined;

  return (
    <AspectRatio
      ratio={16 / 9}
      pos="relative"
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundImage: backdropUrl ? `url(${backdropUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "var(--mantine-color-dark-6)",
      }}
    >
      <div>
        {backdropUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backdropUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(28px)",
              transform: "scale(1.15)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, transparent 55%, black 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, transparent 55%, black 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />
        <Stack gap={6} pos="absolute" bottom={0} left={0} right={0} p="md" style={{ zIndex: 1 }}>
          <Group justify="space-between" align="flex-end" wrap="nowrap">
            <Stack gap={2}>
              <Text fw={700} c="white" size="lg" lineClamp={1} style={{ letterSpacing: -0.3 }}>
                {title}
              </Text>
              {releaseYear && (
                <Text size="sm" c="dimmed">
                  {releaseYear}
                </Text>
              )}
            </Stack>

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
          </Group>
        </Stack>
      </div>
    </AspectRatio>
  );
}
