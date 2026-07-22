import {
  BackgroundImage,
  Badge,
  Button,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  BookmarkSimpleIcon,
  DownloadSimpleIcon,
  DotsThreeIcon,
  FireIcon,
  PlayIcon,
  ShareNetworkIcon,
  StarIcon,
  ThumbsDownIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { getTmdbImageUrl } from "~/lib/tmdb/tmdb.image";
import { buttonHoverVars } from "~/lib/theme/hover";
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <BackgroundImage
        src={backgroundImageUrl}
        radius="lg"
        pos="relative"
        mih={340}
        style={{ overflow: "hidden", backgroundColor: "var(--mantine-color-dark-6)" }}
      >
        <Flex
          direction="column"
          justify="space-between"
          pos="absolute"
          p={{ base: "md", sm: "xl" }}
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

          <Stack gap="xs">
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
            <Title order={2} c="white">
              {movie.title}
            </Title>
            <Text size="sm" c="dimmed" lineClamp="md">
              {movie.overview}
            </Text>
            <Group gap="sm">
              <Button
                leftSection={<PlayIcon size={18} weight="fill" />}
                color="white"
                c="dark.9"
                radius="xl"
                style={buttonHoverVars()}
              >
                Watch Now
              </Button>
              <Button
                variant="filled"
                color="dark.9"
                c="white"
                radius="xl"
                style={buttonHoverVars()}
              >
                <DownloadSimpleIcon size={18} className="sm:mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Menu position="bottom-end" shadow="md" width={200} radius="md">
                <Menu.Target>
                  <Button
                    variant="filled"
                    color="dark.9"
                    c="white"
                    radius="xl"
                    px="sm"
                    style={buttonHoverVars()}
                  >
                    <DotsThreeIcon size={20} />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<BookmarkSimpleIcon size={16} />}>
                    Add to My List
                  </Menu.Item>
                  <Menu.Item leftSection={<StarIcon size={16} />}>Rate this title</Menu.Item>
                  <Menu.Item leftSection={<ShareNetworkIcon size={16} />}>Share</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item color="red" leftSection={<ThumbsDownIcon size={16} />}>
                    Not Interested
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Stack>
        </Flex>
      </BackgroundImage>
    </motion.div>
  );
}
