import { Group } from "@mantine/core";
import { GenrePopularityCard } from "~/components/dashboard/global/GenrePopularityCard";
import { PlatformWatchTimeCard } from "~/components/dashboard/global/PlatformWatchTimeCard";

export function PlatformConsumptionRow() {
  return (
    <Group align="stretch" gap="md" wrap="nowrap">
      <div className="flex-1">
        <GenrePopularityCard />
      </div>
      <div className="flex-2">
        <PlatformWatchTimeCard />
      </div>
    </Group>
  );
}
