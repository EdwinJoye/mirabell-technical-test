import { NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router";
import { useState } from "react";
import type { NavItem } from "~/lib/configs/navbar.config";

type NavbarButtonProps = NavItem & {
  closeNavbar?: () => void;
};

export function NavbarButton({
  closeNavbar,
  label,
  to,
  icon: IconComponent,
  end,
}: NavbarButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      end={end}
      to={to}
      className="group w-full no-underline"
      onClick={closeNavbar}
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
