import { createTheme, type MantineColorsTuple } from "@mantine/core";

const brand: MantineColorsTuple = [
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
  "#4FD9C4",
];

const dimmed: MantineColorsTuple = [
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
  "#9CA3AF",
];

const dark: MantineColorsTuple = [
  "#e4e4e7",
  "#d4d4d8",
  "#a1a1aa",
  "#71717a",
  "#52525b",
  "#3f3f46",
  "#27272a",
  "#18181b",
  "#09090b",
  "#050506",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand, dimmed, dark },
});

export const BRAND_COLOR = "var(--mantine-color-brand-6)";
export const INACTIVE_ICON_COLOR = "var(--mantine-color-gray-5)";
