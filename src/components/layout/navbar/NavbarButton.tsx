import { NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router";
import type { NavItem } from "~/lib/configs/navbar.config";

type NavbarButtonProps = NavItem & {
  closeNavbar: () => void;
};

export function NavbarButton({
  closeNavbar,
  label,
  to,
  icon: IconComponent,
  end,
}: NavbarButtonProps) {
  return (
    <NavLink end={end} to={to} className="group w-full no-underline" onClick={closeNavbar}>
      {({ isActive, isPending }) => (
        <MantineNavLink
          component="div"
          label={label}
          leftSection={<IconComponent size={20} />}
          variant={isActive ? "transparent" : "subtle"}
          color={isActive ? "brand" : undefined}
          c={isActive ? undefined : "dimmed"}
          active={isActive}
          disabled={isPending}
          className="rounded-full"
        />
      )}
    </NavLink>
  );
}
