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
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, undefined, {
    getInitialValueInEffect: false,
  });

  const isNavbarClosed = isDesktop ? !desktopOpened : !mobileOpened;

  function handleToggle() {
    if (isDesktop) {
      toggleDesktop();
      return;
    }
    toggleMobile();
  }

  return (
    <AppShell
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { desktop: !desktopOpened, mobile: true },
      }}
      padding="md"
      withBorder={false}
    >
      {isNavbarClosed && (
        <UnstyledButton
          onClick={handleToggle}
          aria-label="Open menu"
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
        bg="dark.6"
        className="rounded-2xl overflow-hidden"
        style={{
          margin: "var(--mantine-spacing-md)",
          height: "calc(100dvh - (var(--mantine-spacing-md) * 2))",
        }}
      >
        <NavbarMenu />
      </AppShell.Navbar>

      <Drawer
        opened={mobileOpened}
        onClose={closeMobile}
        position="left"
        size={MOBILE_NAVBAR_WIDTH}
        padding={0}
        withCloseButton={false}
        bg="dark.6"
      >
        <NavbarMenu closeNavbar={closeMobile} />
      </Drawer>

      <AppShell.Main bg="dark.7">
        <Suspense fallback={<CenteredLoader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
