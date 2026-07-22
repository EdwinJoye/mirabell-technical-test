import { AppShell, Drawer } from "@mantine/core";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { CenteredLoader } from "~/components/ui/CenteredLoader";
import { ScrollToTopButton } from "~/components/ui/ScrollToTopButton";
import { NavbarMenu } from "~/components/layout/navbar/NavbarMenu";
import { useNavbarStore } from "~/features/navbar/navbar.store";

const NAVBAR_WIDTH = 220;
const MOBILE_NAVBAR_WIDTH = "66%";

export function MainLayout() {
  const isDesktopOpen = useNavbarStore((state) => state.isDesktopOpen);
  const isMobileOpen = useNavbarStore((state) => state.isMobileOpen);
  const closeNavbar = useNavbarStore((state) => state.close);

  return (
    <AppShell
      navbar={{
        width: NAVBAR_WIDTH,
        breakpoint: "sm",
        collapsed: { desktop: !isDesktopOpen, mobile: !isMobileOpen },
      }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Navbar visibleFrom="sm">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            marginTop: "var(--mantine-spacing-md)",
            marginBottom: "var(--mantine-spacing-md)",
            marginLeft: "var(--mantine-spacing-md)",
            height: "calc(100dvh - (var(--mantine-spacing-md) * 2))",
            backgroundColor: "var(--mantine-color-dark-6)",
          }}
        >
          <NavbarMenu closeNavbar={closeNavbar} />
        </div>
      </AppShell.Navbar>

      <Drawer
        opened={isMobileOpen}
        onClose={closeNavbar}
        position="left"
        size={MOBILE_NAVBAR_WIDTH}
        padding={0}
        withCloseButton={false}
        bg="dark.6"
      >
        <NavbarMenu closeNavbar={closeNavbar} />
      </Drawer>

      <AppShell.Main bg="dark.7">
        <Suspense fallback={<CenteredLoader />}>
          <Outlet />
        </Suspense>
      </AppShell.Main>

      <ScrollToTopButton />
    </AppShell>
  );
}
