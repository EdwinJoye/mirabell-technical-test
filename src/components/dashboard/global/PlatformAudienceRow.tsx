import { Group } from "@mantine/core";
import { motion } from "framer-motion";
import { DeviceDistributionCard } from "~/components/dashboard/global/DeviceDistributionCard";
import { TopWatchedMoviesCard } from "~/components/dashboard/global/TopWatchedMoviesCard";

export function PlatformAudienceRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      <Group align="stretch" gap="md" wrap="nowrap">
        <div className="flex-2">
          <TopWatchedMoviesCard />
        </div>
        <div className="flex-1">
          <DeviceDistributionCard />
        </div>
      </Group>
    </motion.div>
  );
}
