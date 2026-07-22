import {
  Avatar,
  DEFAULT_THEME,
  Group,
  Select,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FilmSlateIcon, GlobeIcon } from "@phosphor-icons/react";
import avatarUrl from "~/assets/avatar.jpg";
import { NavbarToggleButton } from "~/components/ui/NavbarToggleButton";
import { SegmentedItemLabel } from "~/components/ui/SegmentedItemLabel";
import { segmentedControlStyles } from "~/lib/theme/segmented-control";
import { theme } from "~/lib/theme/theme";

const DASHBOARD_TOOLBAR_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;
const TOOLBAR_ROW_HEIGHT = 36;

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
  const isDesktop = useMediaQuery(`(min-width: ${DASHBOARD_TOOLBAR_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });
  const title = view === "movie" ? "Movie Dashboard" : "Global Dashboard";
  const selectedMovieTitle = movieOptions.find((option) => option.value === movieId)?.label;

  const avatar = <Avatar src={avatarUrl} radius="xl" alt="User profile" />;

  return (
    <Stack gap="sm">
      <div style={{ position: "relative", minHeight: TOOLBAR_ROW_HEIGHT }}>
        <Group justify="space-between" wrap="nowrap" align="center" h={TOOLBAR_ROW_HEIGHT}>
          <NavbarToggleButton />
          {isDesktop && avatar}
        </Group>
        <Title
          order={2}
          size={isDesktop ? "h2" : "h4"}
          ta="center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Title>
        {!isDesktop && (
          <div
            style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
          >
            {avatar}
          </div>
        )}
      </div>

      <Group justify={isDesktop ? "flex-end" : "center"} wrap="wrap">
        <Stack gap="sm" align={isDesktop ? "flex-end" : "center"}>
          <Group gap="sm">
            <SegmentedControl
              value={view}
              onChange={onViewChange}
              data={[
                { label: <SegmentedItemLabel icon={GlobeIcon} label="Global" />, value: "global" },
                {
                  label: <SegmentedItemLabel icon={FilmSlateIcon} label="Movie" />,
                  value: "movie",
                },
              ]}
              radius="xl"
              styles={segmentedControlStyles}
            />
            {isDesktop && avatar}
          </Group>

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
      </Group>

      {view === "movie" && selectedMovieTitle && (
        <Text size="md" c="brand.4" ta={isDesktop ? "left" : "center"}>
          {selectedMovieTitle}
        </Text>
      )}
    </Stack>
  );
}
