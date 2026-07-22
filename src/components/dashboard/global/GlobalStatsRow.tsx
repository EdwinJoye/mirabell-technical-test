import { SimpleGrid } from "@mantine/core";
import { motion } from "framer-motion";
import { GlobalTotalViewsCard } from "~/components/dashboard/global/GlobalTotalViewsCard";
import { GlobalActiveUsersCard } from "~/components/dashboard/global/GlobalActiveUsersCard";
import { GlobalWatchTimeCard } from "~/components/dashboard/global/GlobalWatchTimeCard";
import { getGlobalDashboardData } from "~/features/dashboard/dashboard.service";

export function GlobalStatsRow() {
  const { stats, watchTimeOverTime, activeUsersOverTime } = getGlobalDashboardData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        <GlobalTotalViewsCard stats={stats} />
        <GlobalActiveUsersCard stats={stats} activeUsersOverTime={activeUsersOverTime} />
        <GlobalWatchTimeCard stats={stats} watchTimeOverTime={watchTimeOverTime} />
      </SimpleGrid>
    </motion.div>
  );
}
