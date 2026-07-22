import { Flex } from "@mantine/core";
import { motion } from "framer-motion";
import { GenrePopularityCard } from "~/components/dashboard/global/GenrePopularityCard";
import { PlatformConsumptionCard } from "./PlatformConsumptionCard";

export function PlatformConsumptionRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
        <div className="sm:flex-1">
          <GenrePopularityCard />
        </div>
        <div className="sm:flex-2">
          <PlatformConsumptionCard />
        </div>
      </Flex>
    </motion.div>
  );
}
