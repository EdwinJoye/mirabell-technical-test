import { SimpleGrid } from "@mantine/core";
import { TotalViewsCard } from "~/components/dashboard/TotalViewsCard";
import { ActiveUsersCard } from "~/components/dashboard/ActiveUsersCard";
import { WatchTimeCard } from "~/components/dashboard/WatchTimeCard";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";

export function PlatformStatsRow() {
  const { stats, watchTimeOverTime, activeUsersOverTime } = getGlobalDashboardData();

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      <TotalViewsCard stats={stats} />
      <ActiveUsersCard stats={stats} activeUsersOverTime={activeUsersOverTime} />
      <WatchTimeCard stats={stats} watchTimeOverTime={watchTimeOverTime} />
    </SimpleGrid>
  );
}
