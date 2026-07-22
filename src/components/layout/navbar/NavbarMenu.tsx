import { ActionIcon, Divider, Flex, Stack } from "@mantine/core";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getNavItems } from "~/lib/configs/navbar.config";
import { Logo } from "./Logo";
import { NavbarButton } from "./NavbarButton";
import { getHoverIconColor } from "~/lib/theme/hover";

type NavbarMenuProps = {
  closeNavbar?: () => void;
};

export function NavbarMenu({ closeNavbar }: NavbarMenuProps) {
  const navigate = useNavigate();
  const navItems = getNavItems();
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  function handleGoHome() {
    void navigate("/");
  }

  return (
    <Stack gap="md" className="px-2.5 py-3">
      <Flex justify="center" align="center" pos="relative" pt="xl">
        <Logo height={24} onClick={handleGoHome} />

        <ActionIcon
          variant="transparent"
          radius="xl"
          size="sm"
          onClick={closeNavbar}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
          aria-label="Close menu"
          pos="absolute"
          top={-4}
          right={0}
        >
          <X size={18} color={getHoverIconColor(isCloseHovered)} />
        </ActionIcon>
      </Flex>

      <Divider mt={0} mb="xs" w="60%" mx="auto" />

      <Stack gap="xs">
        {navItems.map((item) =>
          item.type === "divider" ? (
            <Divider key={item.id} my="sm" size="xs" />
          ) : (
            <NavbarButton key={item.id} {...item} />
          ),
        )}
      </Stack>
    </Stack>
  );
}
