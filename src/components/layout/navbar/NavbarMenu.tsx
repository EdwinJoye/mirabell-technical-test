import { ActionIcon, Divider, Flex, Stack } from "@mantine/core";
import { X } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { getNavItems } from "~/lib/configs/navbar.config";
import { Logo } from "./Logo";
import { NavbarButton } from "./NavbarButton";

type NavbarMenuProps = {
  closeNavbar?: () => void;
};

export function NavbarMenu({ closeNavbar }: NavbarMenuProps) {
  const navigate = useNavigate();
  const navItems = getNavItems();

  function handleGoHome() {
    void navigate("/");
  }

  return (
    <Stack gap="md" className="px-2.5 py-3">
      <Flex justify="center" align="center" pos="relative" pt="md">
        <Logo height={24} onClick={handleGoHome} />

        <ActionIcon
          variant="subtle"
          onClick={closeNavbar}
          hiddenFrom="sm"
          aria-label="Close menu"
          pos="absolute"
          top={-8}
          right={-8}
        >
          <X size={18} />
        </ActionIcon>
      </Flex>

      <Divider mt={0} mb="xs" w="60%" mx="auto" />

      <Stack gap="xs">
        {navItems.map((item) =>
          item.type === "divider" ? (
            <Divider key={item.id} my="sm" size="xs" />
          ) : (
            <NavbarButton key={item.id} closeNavbar={closeNavbar} {...item} />
          ),
        )}
      </Stack>
    </Stack>
  );
}
