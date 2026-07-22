import { Flex } from "@mantine/core";
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
      <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
        <div className="sm:flex-2">
          <TopWatchedMoviesCard />
        </div>
        <div className="sm:flex-1">
          <DeviceDistributionCard />
        </div>
      </Flex>
    </motion.div>
  );
}
