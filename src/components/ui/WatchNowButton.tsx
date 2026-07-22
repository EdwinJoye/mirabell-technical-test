import { Button } from "@mantine/core";
import { PlayIcon } from "@phosphor-icons/react";
import { buttonHoverVars } from "~/lib/theme/hover";

export function WatchNowButton() {
  return (
    <Button
      leftSection={<PlayIcon size={18} weight="fill" />}
      color="white"
      c="dark.9"
      radius="xl"
      style={buttonHoverVars()}
    >
      Watch Now
    </Button>
  );
}
