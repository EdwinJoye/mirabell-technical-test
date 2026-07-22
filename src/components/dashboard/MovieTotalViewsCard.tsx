import { ActionIcon, Badge, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { EyeIcon, InfoIcon, TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient, glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import type { MovieDashboardStats, MovieViewsPoint } from "~/features/dashboard/dashboard.types";

type MovieTotalViewsCardProps = {
  stats: MovieDashboardStats;
  viewsEvolution: MovieViewsPoint[];
};

export function MovieTotalViewsCard({ stats, viewsEvolution }: MovieTotalViewsCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const isPositiveGrowth = stats.growthRate >= 0;
  const growthPercent = (stats.growthRate * 100).toFixed(1);

  return (
    <Card radius="lg" p="sm" style={{ ...dashboardCardGradient, height: "100%" }}>
      <Stack gap={6} h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <EyeIcon size={16} color="var(--mantine-color-brand-6)" />

            <Text size="sm" c="dimmed" fw={500}>
              Total Views
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Badge
              leftSection={
                isPositiveGrowth ? <TrendUpIcon size={12} /> : <TrendDownIcon size={12} />
              }
              color={isPositiveGrowth ? "brand" : "red"}
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={glassBadgeStyles}
            >
              {isPositiveGrowth ? "+" : ""}
              {growthPercent}%
            </Badge>

            <Tooltip
              label={`Shows total views for ${stats.title} and their recent evolution.`}
              withArrow
              multiline
              w={240}
            >
              <ActionIcon
                variant="transparent"
                radius="xl"
                size="sm"
                aria-label="More information"
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
              >
                <InfoIcon
                  size={18}
                  color={
                    isInfoHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-gray-5)"
                  }
                />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Text size="1.5rem" fw={700} c="white" style={{ letterSpacing: -0.5, lineHeight: 1.1 }}>
          {stats.totalViews.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed" lineClamp={1}>
          Views for {stats.title}
        </Text>

        <Stack mt="auto">
          <LineChart
            h={80}
            data={viewsEvolution}
            dataKey="date"
            series={[{ name: "views", color: "brand.6" }]}
            withXAxis={false}
            withYAxis={false}
            withDots={false}
            curveType="natural"
            gridAxis="none"
            strokeWidth={2}
          />
        </Stack>
      </Stack>
    </Card>
  );
}
