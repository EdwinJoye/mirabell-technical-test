import { ActionIcon, Badge, Card, Group, Stack, Text, Tooltip } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { InfoIcon, TrendUpIcon, UsersIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { dashboardCardGradient, glassBadgeStyles } from "~/components/dashboard/dashboard.styles";
import type { ActiveUsersPoint, GlobalDashboardStats } from "~/features/dashboard/dashboard.types";

type ActiveUsersCardProps = {
  stats: GlobalDashboardStats;
  activeUsersOverTime: ActiveUsersPoint[];
};

export function ActiveUsersCard({ stats, activeUsersOverTime }: ActiveUsersCardProps) {
  const [isInfoHovered, setIsInfoHovered] = useState(false);

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
      p="lg"
      style={{
        ...dashboardCardGradient,
        height: "100%",
      }}
    >
      <Stack gap="sm" h="100%">
        <Group justify="space-between" align="center">
          <Group gap={8}>
            <UsersIcon size={16} color="var(--mantine-color-brand-6)" />

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

            <Tooltip
              label="Shows the number of active users and the distribution between new and returning users for the current period."
              withArrow
              multiline
              w={260}
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

        <Text
          size="2rem"
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
            <Group gap="lg">
              <Group gap={8}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "var(--mantine-color-brand-6)",
                  }}
                />

                <Text size="xs" c="dimmed">
                  {stats.newUsers.toLocaleString()} new
                </Text>
              </Group>

              <Group gap={8}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "var(--mantine-color-dark-3)",
                  }}
                />

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
