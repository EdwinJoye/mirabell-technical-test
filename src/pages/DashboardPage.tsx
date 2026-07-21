import { ScrollArea, Stack, Title } from "@mantine/core";
import { PlatformAudienceRow } from "~/components/dashboard/PlatformAudienceRow";
import { PlatformConsumptionRow } from "~/components/dashboard/PlatformConsumptionRow";
import { PlatformStatsRow } from "~/components/dashboard/PlatformStatsRow";

export function DashboardPage() {
  return (
    <Stack gap="md" pl={{ base: 0, sm: "md" }} style={{ height: "calc(100dvh - 44px)" }}>
      <Title order={2}>Dashboard</Title>

      <ScrollArea type="auto" style={{ flex: 1 }}>
        <Stack gap="md">
          <PlatformStatsRow />
          <PlatformConsumptionRow />
          <PlatformAudienceRow />
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
