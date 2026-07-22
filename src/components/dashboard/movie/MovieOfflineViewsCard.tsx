import { Badge, Card, Group, Progress, Stack, Text } from "@mantine/core";
import { DownloadSimpleIcon, TrendUpIcon } from "@phosphor-icons/react";
import { dashboardCardGradient, glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import { getMovieDashboardData } from "~/features/dashboard/dashboard.service";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

type MovieOfflineViewsCardProps = {
  tmdbMovieId: number;
};

export function MovieOfflineViewsCard({ tmdbMovieId }: MovieOfflineViewsCardProps) {
  const dashboardData = getMovieDashboardData(tmdbMovieId);

  if (!dashboardData) {
    return null;
  }

  const { downloads, downloadRate } = dashboardData.offlineViews;
  const totalViews = dashboardData.stats.totalViews;

  return (
    <Card
      radius="lg"
      p="lg"
      style={{
        ...dashboardCardGradient,
        height: "100%",
      }}
    >
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <DownloadSimpleIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Offline Downloads
            </Text>
          </Group>

          <Group gap={6}>
            <Badge
              leftSection={<TrendUpIcon size={12} />}
              color="brand"
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={glassBadgeStyles}
            >
              +12%
            </Badge>

            <InfoTooltip
              label="Shows how many users downloaded this movie for offline viewing compared to total streaming views."
              width={260}
            />
          </Group>
        </Group>

        <Text
          size="2rem"
          fw={700}
          c="white"
          style={{
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {downloads.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          Downloads this month
        </Text>

        <Stack mt="auto" gap="sm">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Streaming views
            </Text>

            <Text size="xs" fw={600} c="white">
              {totalViews.toLocaleString()}
            </Text>
          </Group>

          <Group justify="center">
            <Progress
              value={downloadRate}
              radius="xl"
              color="brand"
              w="85%"
              styles={{
                root: {
                  height: 12,
                },
              }}
            />
          </Group>

          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              Offline adoption
            </Text>

            <Text size="xs" fw={600} c="brand.4">
              {downloadRate.toFixed(1)}%
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
