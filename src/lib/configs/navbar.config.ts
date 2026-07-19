import { CompassIcon, GaugeIcon, HeartIcon, HouseIcon } from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type NavItem = {
  id: string;
  label: string;
  to: string;
  icon: ComponentType<IconProps>;
  end?: boolean;
};

export function getNavItems(): NavItem[] {
  return [
    { id: "home", label: "Home", to: "/", icon: HouseIcon, end: true },
    { id: "explore", label: "Explore", to: "/explore", icon: CompassIcon },
    { id: "favourites", label: "Favourites", to: "/favourites", icon: HeartIcon },
    { id: "dashboard", label: "Dashboard", to: "/admin", icon: GaugeIcon },
  ];
}
