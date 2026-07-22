import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { TrendUpIcon, UsersIcon } from "@phosphor-icons/react";
import { dashboardCardGradient, glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import { LegendDot } from "~/components/dashboard/LegendDot";
import type { ActiveUsersPoint, GlobalDashboardStats } from "~/features/dashboard/dashboard.types";
import { BRAND_COLOR } from "~/lib/theme/theme";
import { InfoTooltip } from "~/components/dashboard/InfoTooltip";

type ActiveUsersCardProps = {
  stats: GlobalDashboardStats;
  activeUsersOverTime: ActiveUsersPoint[];
};

export function GlobalActiveUsersCard({ stats, activeUsersOverTime }: ActiveUsersCardProps) {
  const returningUsers = stats.activeUsers - stats.newUsers;
  const returningRate = ((returningUsers / stats.activeUsers) * 100).toFixed(0);

  const previousActiveUsers = activeUsersOverTime[0]?.activeUsers ?? 0;
  const growthRate =
    previousActiveUsers > 0
      ? ((stats.activeUsers - previousActiveUsers) / previousActiveUsers) * 100
      : 0;
  const growthPercent = growthRate.toFixed(1);

  return (
    <Card
      radius="lg"
      p="sm"
      style={{
        ...dashboardCardGradient,
        height: "100%",
      }}
    >
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <UsersIcon size={16} color={BRAND_COLOR} />

            <Text size="sm" c="dimmed" fw={500}>
              Active Users
            </Text>
          </Group>

          <Group gap={6} align="center">
            <Badge
              leftSection={<TrendUpIcon size={12} />}
              color="brand"
              variant="filled"
              tt="none"
              fw={500}
              size="sm"
              styles={glassBadgeStyles}
            >
              +{growthPercent}%
            </Badge>

            <InfoTooltip
              label="Shows the number of active users and the distribution between new and returning users for the current period."
              width={260}
            />
          </Group>
        </Group>

        <Text
          size="1.5rem"
          fw={700}
          c="white"
          style={{
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}
        >
          {stats.activeUsers.toLocaleString()}
        </Text>

        <Text size="xs" c="dimmed">
          Active users this {stats.period} · {returningRate}% returning users
        </Text>

        <Stack mt="auto" gap="sm">
          <LineChart
            h={90}
            data={activeUsersOverTime}
            dataKey="date"
            series={[
              {
                name: "activeUsers",
                color: "brand.6",
              },
            ]}
            withXAxis
            withYAxis={false}
            withDots={false}
            curveType="natural"
            gridAxis="none"
            yAxisProps={{
              domain: ["dataMin - 10000", "dataMax + 10000"],
            }}
            xAxisProps={{
              tickMargin: 6,
            }}
          />

          <Group justify="space-between" align="center">
            <Group gap="md">
              <Group gap={8}>
                <LegendDot color={BRAND_COLOR} />

                <Text size="xs" c="dimmed">
                  {stats.newUsers.toLocaleString()} new
                </Text>
              </Group>

              <Group gap={8}>
                <LegendDot color="var(--mantine-color-dark-3)" />

                <Text size="xs" c="dimmed">
                  {returningUsers.toLocaleString()} returning
                </Text>
              </Group>
            </Group>

            <Text size="xs" c="dimmed">
              {returningRate}% retention
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
