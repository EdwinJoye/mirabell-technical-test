import { AspectRatio, Stack, Text, UnstyledButton, ThemeIcon } from "@mantine/core";
import { EyeIcon } from "@phosphor-icons/react";
import { useState } from "react";

type MovieDiscoverMoreCardProps = {
  onClick: () => void;
};

export function MovieDiscoverMoreCard({ onClick }: MovieDiscoverMoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AspectRatio ratio={2 / 3}>
      <UnstyledButton
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-md cursor-pointer"
        style={{
          backgroundColor: "var(--mantine-color-dark-6)",
          border: `1px solid ${isHovered ? "var(--mantine-color-brand-6)" : "rgba(255, 255, 255, 0.1)"}`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "all 300ms ease",
        }}
      >
        <Stack align="center" justify="center" gap={10} p="sm" h="100%">
          <ThemeIcon
            size={44}
            radius="xl"
            variant="outline"
            style={{
              borderColor: isHovered
                ? "var(--mantine-color-brand-6)"
                : "var(--mantine-color-dimmed)",
              color: isHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-dimmed)",
              transition: "all 300ms ease",
            }}
          >
            <EyeIcon size={22} />
          </ThemeIcon>
          <Text
            size="sm"
            fw={500}
            ta="center"
            c={isHovered ? "brand.6" : "dimmed"}
            style={{ transition: "color 300ms ease" }}
          >
            Découvrir plus
          </Text>
        </Stack>
      </UnstyledButton>
    </AspectRatio>
  );
}
