import { ActionIcon } from "@mantine/core";
import { ListIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useIsNavbarClosed, useNavbarStore } from "~/features/navbar/navbar.store";
import { BRAND_COLOR } from "~/lib/theme/theme";

export function NavbarToggleButton() {
  const isNavbarClosed = useIsNavbarClosed();
  const toggleNavbar = useNavbarStore((state) => state.toggle);
  const [isHovered, setIsHovered] = useState(false);

  if (!isNavbarClosed) {
    return null;
  }

  return (
    <ActionIcon
      variant="transparent"
      size="lg"
      onClick={toggleNavbar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Open menu"
    >
      <ListIcon size={20} color={isHovered ? BRAND_COLOR : "var(--mantine-color-white)"} />
    </ActionIcon>
  );
}
