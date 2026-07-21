import { Group } from "@mantine/core";
import { GenrePopularityChart } from "~/components/dashboard/GenrePopularityChart";
import { PlatformWatchTimeChart } from "~/components/dashboard/PlatformWatchTimeChart";

export function PlatformConsumptionRow() {
  return (
    <Group align="stretch" gap="md" wrap="nowrap">
      <div className="flex-1">
        <GenrePopularityChart />
      </div>
      <div className="flex-2">
        <PlatformWatchTimeChart />
      </div>
    </Group>
  );
}
