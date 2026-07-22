import type { CSSProperties } from "react";
import { BRAND_COLOR, INACTIVE_ICON_COLOR } from "~/lib/theme/theme";

const HOVER_TRANSITION = "background-color 400ms ease, color 400ms ease";

export function buttonHoverVars(
  hoverColor = BRAND_COLOR,
  hoverTextColor = "var(--mantine-color-dark-9)",
): CSSProperties {
  return {
    "--button-hover": hoverColor,
    "--button-hover-color": hoverTextColor,
    transition: HOVER_TRANSITION,
  } as CSSProperties;
}

export function actionIconHoverVars(
  hoverColor = BRAND_COLOR,
  hoverTextColor = "var(--mantine-color-dark-9)",
): CSSProperties {
  return {
    "--ai-hover": hoverColor,
    "--ai-hover-color": hoverTextColor,
    transition: HOVER_TRANSITION,
  } as CSSProperties;
}

export function glassActionIconVars(): CSSProperties {
  return {
    "--ai-bg": "rgba(255, 255, 255, 0.12)",
    "--ai-bd": "1px solid rgba(255, 255, 255, 0.2)",
    "--ai-hover": BRAND_COLOR,
    "--ai-hover-color": "var(--mantine-color-dark-9)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: HOVER_TRANSITION,
  } as CSSProperties;
}

export function getHoverIconColor(isHovered: boolean): string {
  return isHovered ? BRAND_COLOR : INACTIVE_ICON_COLOR;
}
