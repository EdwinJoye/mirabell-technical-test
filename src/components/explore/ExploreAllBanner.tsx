import { DEFAULT_THEME, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ArrowRightIcon, FilmSlateIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { theme } from "~/lib/theme/theme";

const EXPLORE_BANNER_BREAKPOINT = theme.breakpoints?.sm ?? DEFAULT_THEME.breakpoints.sm;

type ExploreAllBannerProps = {
  onClick: () => void;
};

export function ExploreAllBanner({ onClick }: ExploreAllBannerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${EXPLORE_BANNER_BREAKPOINT})`, undefined, {
    getInitialValueInEffect: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-8 mb-8"
    >
      <UnstyledButton
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-full overflow-hidden cursor-pointer relative mx-auto block"
        w={{ base: "94%", sm: "85%" }}
        style={{
          background: isHovered
            ? "linear-gradient(120deg, rgba(79, 217, 196, 0.18), var(--mantine-color-dark-6) 60%)"
            : "linear-gradient(120deg, var(--mantine-color-dark-5), var(--mantine-color-dark-7) 70%)",
          border: `1px solid ${isHovered ? "var(--mantine-color-brand-6)" : "rgba(255, 255, 255, 0.08)"}`,
          transform: isHovered ? "scale(1.005)" : "scale(1)",
          transition: "all 400ms ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: isHovered
              ? "radial-gradient(circle, rgba(79, 217, 196, 0.15), transparent 70%)"
              : "transparent",
            transition: "background 400ms ease",
          }}
        />
        <Group
          justify={isDesktop ? "space-between" : "center"}
          px={{ base: "md", sm: "xl" }}
          py="sm"
          wrap="nowrap"
          gap="sm"
          style={{ position: "relative" }}
        >
          <Group gap="sm" wrap="nowrap">
            <ThemeIcon
              size={40}
              radius="xl"
              variant="filled"
              style={{
                backgroundColor: isHovered
                  ? "var(--mantine-color-brand-6)"
                  : "rgba(255, 255, 255, 0.06)",
                color: isHovered ? "var(--mantine-color-dark-9)" : "white",
                transition: "all 400ms ease",
              }}
            >
              <FilmSlateIcon size={20} weight={isHovered ? "fill" : "regular"} />
            </ThemeIcon>
            <Text
              fw={600}
              size="md"
              c="white"
              lineClamp={1}
              style={{ transition: "color 400ms ease" }}
            >
              Explore the full catalog
            </Text>
          </Group>
          <Group
            gap={6}
            wrap="nowrap"
            visibleFrom="sm"
            style={{
              color: isHovered ? "var(--mantine-color-brand-6)" : "var(--mantine-color-dimmed)",
              transition: "color 400ms ease",
            }}
          >
            <Text size="sm" fw={600} c="inherit">
              Browse all
            </Text>
            <ArrowRightIcon
              size={18}
              color="currentColor"
              style={{
                transform: isHovered ? "translateX(6px)" : "translateX(0)",
                transition: "transform 400ms ease",
              }}
            />
          </Group>
        </Group>
      </UnstyledButton>
    </motion.div>
  );
}
