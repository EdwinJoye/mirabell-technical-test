import { AppShell, Drawer, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import { NavbarMenu } from "~/components/layout/navbar/NavbarMenu";

const NAVBAR_WIDTH = 220;
const MOBILE_NAVBAR_WIDTH = "66%";

export type MainLayoutContext = {
  onToggleNavbar: () => void;
};

export function MainLayout() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, undefined, {
    getInitialValueInEffect: false,
  });

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
          <Outlet context={{ onToggleNavbar: handleToggle } satisfies MainLayoutContext} />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
}
