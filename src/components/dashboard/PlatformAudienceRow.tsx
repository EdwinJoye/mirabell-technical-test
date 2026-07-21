import { Group } from "@mantine/core";
import { DeviceDistributionChart } from "~/components/dashboard/DeviceDistributionChart";
import { TopWatchedMoviesChart } from "~/components/dashboard/TopWatchedMoviesChart";

export function PlatformAudienceRow() {
  return (
    <Group align="stretch" gap="md" wrap="nowrap">
      <div style={{ flex: 2 }}>
        <TopWatchedMoviesChart />
      </div>
      <div style={{ flex: 1 }}>
        <DeviceDistributionChart />
      </div>
    </Group>
  );
}
