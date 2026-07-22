import { Group } from "@mantine/core";
import { DeviceDistributionCard } from "~/components/dashboard/global/DeviceDistributionCard";
import { TopWatchedMoviesCard } from "~/components/dashboard/global/TopWatchedMoviesCard";

export function PlatformAudienceRow() {
  return (
    <Group align="stretch" gap="md" wrap="nowrap">
      <div className="flex-2">
        <TopWatchedMoviesCard />
      </div>
      <div className="flex-1">
        <DeviceDistributionCard />
      </div>
    </Group>
  );
}
