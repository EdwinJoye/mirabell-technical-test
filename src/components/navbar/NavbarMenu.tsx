import { ActionIcon, Flex, Stack } from "@mantine/core";
import { X } from "@phosphor-icons/react";
import { useNavigate } from "react-router";
import { getNavItems } from "~/lib/configs/navbar.config";
import { Logo } from "~/components/navbar/Logo";
import { NavbarButton } from "./NavbarButton";

type NavbarMenuProps = {
  closeNavbar: () => void;
};

export function NavbarMenu({ closeNavbar }: NavbarMenuProps) {
  const navigate = useNavigate();
  const navItems = getNavItems();

  function handleGoHome() {
    void navigate("/");
  }

  return (
    <Stack gap="xl" className="px-2.5 py-3">
      <Flex justify="center" align="center" pos="relative" py="md">
        <Logo height={24} onClick={handleGoHome} />
        <ActionIcon
          variant="subtle"
          onClick={closeNavbar}
          hiddenFrom="sm"
          aria-label="Fermer le menu"
          pos="absolute"
          top={-8}
          right={-8}
        >
          <X size={18} />
        </ActionIcon>
      </Flex>
      <Stack gap="xs">
        {navItems.map((item) => (
          <NavbarButton key={item.id} closeNavbar={closeNavbar} {...item} />
        ))}
      </Stack>
    </Stack>
  );
}
