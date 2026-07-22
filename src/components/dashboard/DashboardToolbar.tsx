import { Avatar, Group, Select, SegmentedControl, Text, Title } from "@mantine/core";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import avatarUrl from "~/assets/avatar.jpg";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";

type DashboardToolbarProps = {
  view: string;
  onViewChange: (value: string) => void;
  movieOptions: { value: string; label: string }[];
  movieId: string | null;
  onMovieChange: (value: string) => void;
};

export function DashboardToolbar({
  view,
  onViewChange,
  movieOptions,
  movieId,
  onMovieChange,
}: DashboardToolbarProps) {
  const title = view === "movie" ? "Movie Dashboard" : "Global Dashboard";
  const selectedMovieTitle = movieOptions.find((option) => option.value === movieId)?.label;

  return (
    <Group justify="space-between" wrap="wrap">
      <Group gap="sm">
        <NavbarToggleButton />

        <Title order={2}>{title}</Title>
        {view === "movie" && selectedMovieTitle && (
          <Text size="md" c="brand.4">
            {selectedMovieTitle}
          </Text>
        )}
      </Group>

      <Group gap="sm">
        {view === "movie" && (
          <Select
            value={movieId}
            onChange={(value) => value && onMovieChange(value)}
            data={movieOptions}
            radius="xl"
            w={220}
            allowDeselect={false}
            aria-label="Select movie"
          />
        )}

        <SegmentedControl
          value={view}
          onChange={onViewChange}
          data={[
            {
              label: <SegmentedItemLabel icon={GlobeIcon} label="Global" />,
              value: "global",
            },
            {
              label: <SegmentedItemLabel icon={FilmSlateIcon} label="Movie" />,
              value: "movie",
            },
          ]}
          radius="xl"
          styles={segmentedControlStyles}
        />

        <Avatar src={avatarUrl} radius="xl" alt="User profile" />
      </Group>
    </Group>
  );
}
