import { Flex } from "@mantine/core";
import { motion } from "framer-motion";
import { GlobalGenrePopularityCard } from "~/components/dashboard/global/GlobalGenrePopularityCard";
import { GlobalConsumptionCard } from "./GlobalConsumptionCard";

export function GlobalConsumptionRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
        <div className="sm:flex-1">
          <GlobalGenrePopularityCard />
        </div>
        <div className="sm:flex-2">
          <GlobalConsumptionCard />
        </div>
      </Flex>
    </motion.div>
  );
}
