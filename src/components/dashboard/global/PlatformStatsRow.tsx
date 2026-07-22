import { SimpleGrid } from "@mantine/core";
import { motion } from "framer-motion";
import { TotalViewsCard } from "~/components/dashboard/global/TotalViewsCard";
import { ActiveUsersCard } from "~/components/dashboard/global/ActiveUsersCard";
import { WatchTimeCard } from "~/components/dashboard/global/WatchTimeCard";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";

export function PlatformStatsRow() {
  const { stats, watchTimeOverTime, activeUsersOverTime } = getGlobalDashboardData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <TotalViewsCard stats={stats} />
        <ActiveUsersCard stats={stats} activeUsersOverTime={activeUsersOverTime} />
        <WatchTimeCard stats={stats} watchTimeOverTime={watchTimeOverTime} />
      </SimpleGrid>
    </motion.div>
  );
}
