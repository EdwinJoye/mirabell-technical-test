import { NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router";
import { useState } from "react";
import { useNavbarStore } from "~/features/navbar/navbar.store";
import type { NavLinkItem } from "~/lib/configs/navbar.config";

type NavbarButtonProps = NavLinkItem;

export function NavbarButton({ label, to, icon: IconComponent, end }: NavbarButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const closeMobileNavbar = useNavbarStore((state) => state.closeMobile);

  return (
    <NavLink
      end={end}
      to={to}
      className="group w-full no-underline"
      onClick={closeMobileNavbar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {({ isActive, isPending }) => (
        <MantineNavLink
          component="div"
          label={label}
          leftSection={<IconComponent size={20} />}
          variant={isActive ? "transparent" : "subtle"}
          color={isActive ? "brand" : undefined}
          c={isActive ? undefined : isHovered ? "white" : "dimmed"}
          active={isActive}
          disabled={isPending}
          className="rounded-full"
          style={{ transition: "color 200ms ease" }}
        />
      )}
    </NavLink>
  );
}
