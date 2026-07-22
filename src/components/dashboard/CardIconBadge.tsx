import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import { BRAND_COLOR } from "~/lib/theme/theme";

type CardIconBadgeProps = {
  icon: ComponentType<IconProps>;
};

export function CardIconBadge({ icon: Icon }: CardIconBadgeProps) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(79, 217, 196, 0.12)",
      }}
    >
      <Icon size={14} color={BRAND_COLOR} />
    </div>
  );
}
