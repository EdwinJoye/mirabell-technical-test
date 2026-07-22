import { ActionIcon } from "@mantine/core";
import { PlayIcon } from "@phosphor-icons/react";
import { actionIconHoverVars } from "~/lib/theme/hover";

type PlayButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
};

export function PlayButton({ onClick, ariaLabel = "Play" }: PlayButtonProps) {
  return (
    <ActionIcon
      onClick={onClick}
      radius="xl"
      size="sm"
      variant="filled"
      c="dark.9"
      aria-label={ariaLabel}
      style={{ ...actionIconHoverVars(), "--ai-bg": "var(--mantine-color-white)" }}
    >
      <PlayIcon size={12} weight="fill" />
    </ActionIcon>
  );
}
