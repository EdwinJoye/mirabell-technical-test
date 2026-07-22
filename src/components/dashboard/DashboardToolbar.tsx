import { Group, Select, SegmentedControl, Title } from "@mantine/core";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
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

  return (
    <Group justify="space-between" wrap="wrap">
      <Group gap="sm">
        <NavbarToggleButton />

        <Title order={2}>{title}</Title>
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
      </Group>
    </Group>
  );
}
