import { Divider, Flex, Stack, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { GlobalDeviceDistributionCard } from "~/components/dashboard/global/GlobalDeviceDistributionCard";
import { GlobalTopWatchedMoviesCard } from "~/components/dashboard/global/GlobalTopWatchedMoviesCard";

export function GlobalAudienceRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
    >
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} hiddenFrom="sm" />
          <Title order={3} size="h5" c="white">
            Audience Spotlight
          </Title>
          <Divider color="rgba(255, 255, 255, 0.1)" style={{ flex: 1 }} />
        </Flex>
        <Flex direction={{ base: "column", sm: "row" }} align="stretch" gap="md">
          <div className="sm:flex-2">
            <GlobalTopWatchedMoviesCard />
          </div>
          <div className="sm:flex-1">
            <GlobalDeviceDistributionCard />
          </div>
        </Flex>
      </Stack>
    </motion.div>
  );
}
