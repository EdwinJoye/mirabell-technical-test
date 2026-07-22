import { Group, SegmentedControl, Title } from "@mantine/core";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";

type DashboardToolbarProps = {
  view: string;
  onViewChange: (value: string) => void;
};

export function DashboardToolbar({ view, onViewChange }: DashboardToolbarProps) {
  const title = view === "movie" ? "Movie Dashboard" : "Global Dashboard";

  return (
    <Group justify="space-between" wrap="wrap">
      <Group gap="sm">
        <NavbarToggleButton />

        <Title order={2}>{title}</Title>
      </Group>

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
  );
}
