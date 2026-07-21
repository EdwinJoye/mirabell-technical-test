import type { IconProps } from "@phosphor-icons/react";
import {
  CompassIcon,
  GaugeIcon,
  GearIcon,
  HeartIcon,
  HouseIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type NavLinkItem = {
  id: string;
  type?: "link";
  label: string;
  to: string;
  icon: ComponentType<IconProps>;
  end?: boolean;
};

type NavDividerItem = {
  id: string;
  type: "divider";
};

export type NavItem = NavLinkItem | NavDividerItem;

export function getNavItems(): NavItem[] {
  return [
    { id: "home", label: "Home", to: "/", icon: HouseIcon, end: true },
    { id: "explore", label: "Explore", to: "/explore", icon: CompassIcon },
    { id: "favourites", label: "Favourites", to: "/favourites", icon: HeartIcon },
    { id: "divider-1", type: "divider" },
    { id: "dashboard", label: "Dashboard", to: "/dashboard", icon: GaugeIcon },
    { id: "users", label: "Users", to: "/users", icon: UsersIcon },
    { id: "admin", label: "Admin", to: "/admin", icon: UserIcon },
    { id: "divider-2", type: "divider" },
    { id: "settings", label: "Settings", to: "/settings", icon: GearIcon },
  ];
}
