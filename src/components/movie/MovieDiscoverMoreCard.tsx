import { AspectRatio, Stack, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { EyeIcon } from "@phosphor-icons/react";
import { useState } from "react";

type MovieDiscoverMoreCardProps = {
  onClick: () => void;
  label?: string;
};

export function MovieDiscoverMoreCard({
  onClick,
  label = "Discover more",
}: MovieDiscoverMoreCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AspectRatio ratio={2 / 3}>
      <UnstyledButton
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-2xl cursor-pointer overflow-hidden"
        style={{
          backgroundColor: "var(--mantine-color-dark-6)",
          border: `1px solid ${isHovered ? "var(--mantine-color-brand-6)" : "rgba(255, 255, 255, 0.1)"}`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "all 300ms ease",
        }}
      >
        <Stack align="center" justify="center" gap={12} p="sm" h="100%" pos="relative">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isHovered
                ? "radial-gradient(circle at center, rgba(79, 217, 196, 0.08), transparent 70%)"
                : "transparent",
              transition: "background 300ms ease",
            }}
          />
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
              zIndex: 1,
            }}
          >
            <EyeIcon size={22} />
          </ThemeIcon>
          <Stack gap={2} align="center" style={{ zIndex: 1 }}>
            <Text
              size="sm"
              fw={500}
              ta="center"
              c={isHovered ? "brand.6" : "dimmed"}
              style={{ transition: "color 300ms ease" }}
            >
              {label}
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(4px)",
                transition: "all 300ms ease",
              }}
            >
              <Text size="xs" c="brand.6">
                Tout consulter
              </Text>
            </div>
          </Stack>
        </Stack>
      </UnstyledButton>
    </AspectRatio>
  );
}
