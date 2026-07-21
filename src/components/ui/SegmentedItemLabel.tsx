import { Group, Text } from "@mantine/core";
import { useState, type ElementType } from "react";

type SegmentedItemLabelProps = {
  icon: ElementType;
  label: string;
  iconColor?: string;
  showLabel?: boolean;
};

export function SegmentedItemLabel({
  icon: Icon,
  label,
  iconColor,
  showLabel = true,
}: SegmentedItemLabelProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Group
      justify="center"
      gap={6}
      wrap="nowrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={14} weight="fill" color={iconColor} />
      {showLabel && (
        <Text size="xs" c={isHovered ? "white" : undefined}>
          {label}
        </Text>
      )}
    </Group>
  );
}
