import { Group } from "@mantine/core";
import { GenrePopularityChart } from "~/components/dashboard/GenrePopularityChart";
import { PlatformWatchTimeChart } from "~/components/dashboard/PlatformWatchTimeChart";

export function PlatformConsumptionRow() {
  return (
    <Group align="stretch" gap="md" wrap="nowrap">
      <div style={{ flex: 1 }}>
        <GenrePopularityChart />
      </div>
      <div style={{ flex: 2 }}>
        <PlatformWatchTimeChart />
      </div>
    </Group>
  );
}
