import { ActionIcon, Box } from "@mantine/core";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useScrollStore } from "~/features/scroll/scroll.store";
import { BRAND_COLOR } from "~/lib/theme/theme";

export function ScrollToTopButton() {
  const scrollViewport = useScrollStore((state) => state.scrollViewport);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!scrollViewport) {
      return;
    }

    function handleScroll() {
      setIsVisible((scrollViewport?.scrollTop ?? 0) > 0);
    }

    handleScroll();
    scrollViewport.addEventListener("scroll", handleScroll);
    return () => scrollViewport.removeEventListener("scroll", handleScroll);
  }, [scrollViewport]);

  function handleScrollToTop() {
    scrollViewport?.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!scrollViewport || !isVisible) {
    return null;
  }

  return (
    <Box
      pos="fixed"
      bottom={{ base: 16, sm: 32 }}
      right={{ base: 16, sm: 32 }}
      style={{ zIndex: 9998 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ActionIcon
          onClick={handleScrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          radius="xl"
          w={{ base: 48, sm: 56 }}
          h={{ base: 48, sm: 56 }}
          aria-label="Scroll to top"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: `1px solid ${isHovered ? BRAND_COLOR : "rgba(255, 255, 255, 0.15)"}`,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            transition: "border-color 300ms ease",
          }}
        >
          <ArrowUpIcon size={20} color={isHovered ? BRAND_COLOR : "var(--mantine-color-white)"} />
        </ActionIcon>
      </motion.div>
    </Box>
  );
}
