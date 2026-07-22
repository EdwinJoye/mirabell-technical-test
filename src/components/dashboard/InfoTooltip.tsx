import { ActionIcon, Tooltip } from "@mantine/core";
import { InfoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { getHoverIconColor } from "~/lib/theme/hover";

type InfoTooltipProps = {
  label: string;
  width?: number;
};

export function InfoTooltip({ label, width = 240 }: InfoTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tooltip label={label} withArrow multiline w={width}>
      <ActionIcon
        variant="transparent"
        radius="xl"
        size="sm"
        aria-label="More information"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <InfoIcon size={18} color={getHoverIconColor(isHovered)} />
      </ActionIcon>
    </Tooltip>
  );
}
