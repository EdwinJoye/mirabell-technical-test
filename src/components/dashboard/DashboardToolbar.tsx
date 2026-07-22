import { DEFAULT_THEME, Group, Select, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import { AvatarMenu } from "~/components/ui/AvatarMenu";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";
import { theme } from "~/lib/theme/theme";

const DASHBOARD_TOOLBAR_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;

type DashboardToolbarProps = {
  view: string;
  onViewChange: (value: string) => void;
  movieOptions: { value: string; label: string }[];
  movieId: string | null;
  onMovieChange: (value: string) => void;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  const isDesktop = useMediaQuery(`(min-width: ${DASHBOARD_TOOLBAR_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });

  return isDesktop ? <DashboardToolbarDesktop {...props} /> : <DashboardToolbarMobile {...props} />;
}

function DashboardToolbarDesktop({
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
              label: (
                <SegmentedItemLabel
                  icon={GlobeIcon}
                  label="Global"
                  iconColor="var(--mantine-color-brand-6)"
                />
              ),
              value: "global",
            },
            {
              label: (
                <SegmentedItemLabel
                  icon={FilmSlateIcon}
                  label="Movie"
                  iconColor="var(--mantine-color-brand-6)"
                />
              ),
              value: "movie",
            },
          ]}
          radius="xl"
          styles={segmentedControlStyles}
        />
        <AvatarMenu />
      </Group>
    </Group>
  );
}

function DashboardToolbarMobile({
  view,
  onViewChange,
  movieOptions,
  movieId,
  onMovieChange,
}: DashboardToolbarProps) {
  const title = view === "movie" ? "Movie Dashboard" : "Global Dashboard";
  const selectedMovieTitle = movieOptions.find((option) => option.value === movieId)?.label;

  return (
    <Stack gap="sm">
      <Group justify="space-between" wrap="nowrap" align="center">
        <NavbarToggleButton />
        <Title order={4} ta="center" style={{ flex: 1 }}>
          {title}
        </Title>
        <AvatarMenu />
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
