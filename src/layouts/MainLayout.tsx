import { AppShell, Drawer, UnstyledButton, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import { NavbarMenu } from "~/components/layout/navbar/NavbarMenu";

const NAVBAR_WIDTH = 220;
const NAVBAR_TOGGLE_WIDTH = 48;
const NAVBAR_TOGGLE_HEIGHT = 35;
const MOBILE_NAVBAR_WIDTH = "66%";

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure(true);
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, undefined, {
    getInitialValueInEffect: false,
  });

  return (
    <AppShell
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: true },
      }}
      padding="md"
      withBorder={false}
    >
      {!opened && (
        <UnstyledButton
          onClick={toggle}
          aria-label="Ouvrir le menu"
          className="fixed z-50 top-5 left-0 rounded-tr-full rounded-br-full cursor-pointer flex items-center justify-center"
          bg="brand"
          w={NAVBAR_TOGGLE_WIDTH}
          h={NAVBAR_TOGGLE_HEIGHT}
        >
          <ArrowRightIcon size={18} color="white" />
        </UnstyledButton>
      )}

      <AppShell.Navbar
        visibleFrom="sm"
        bg="dark.7"
        className="rounded-2xl overflow-hidden"
        style={{
          margin: "var(--mantine-spacing-md)",
          height: "calc(100dvh - (var(--mantine-spacing-md) * 2))",
        }}
      >
        <NavbarMenu closeNavbar={close} />
      </AppShell.Navbar>

      <Drawer
        opened={opened && !isDesktop}
        onClose={close}
        position="left"
        size={MOBILE_NAVBAR_WIDTH}
        padding={0}
        withCloseButton={false}
        bg="dark.7"
      >
        <NavbarMenu closeNavbar={close} />
      </Drawer>

      <AppShell.Main bg="dark.6">
        <Suspense fallback={<CenteredLoader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
