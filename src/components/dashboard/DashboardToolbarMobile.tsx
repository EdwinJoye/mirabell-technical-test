import { Avatar, Group, Select, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import avatarUrl from "~/assets/avatar.jpg";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";

type DashboardToolbarMobileProps = {
  view: string;
  onViewChange: (value: string) => void;
  movieOptions: { value: string; label: string }[];
  movieId: string | null;
  onMovieChange: (value: string) => void;
};

export function DashboardToolbarMobile({
  view,
  onViewChange,
  movieOptions,
  movieId,
  onMovieChange,
}: DashboardToolbarMobileProps) {
  const title = view === "movie" ? "Movie Dashboard" : "Global Dashboard";
  const selectedMovieTitle = movieOptions.find((option) => option.value === movieId)?.label;

  return (
    <Stack gap="sm">
      <Group justify="space-between" wrap="nowrap" align="center">
        <NavbarToggleButton />
        <Title order={4} ta="center" style={{ flex: 1 }}>
          {title}
        </Title>
        <Avatar src={avatarUrl} radius="xl" alt="User profile" />
      </Group>

      <Stack gap="sm" align="center">
        <SegmentedControl
          value={view}
          onChange={onViewChange}
          data={[
            { label: <SegmentedItemLabel icon={GlobeIcon} label="Global" />, value: "global" },
            { label: <SegmentedItemLabel icon={FilmSlateIcon} label="Movie" />, value: "movie" },
          ]}
          radius="xl"
          styles={segmentedControlStyles}
        />
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
      </Stack>

      {view === "movie" && selectedMovieTitle && (
        <Text size="md" c="brand.4" ta="center">
          {selectedMovieTitle}
        </Text>
      )}
    </Stack>
  );
}
