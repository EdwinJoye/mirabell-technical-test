import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { HouseIcon } from "@phosphor-icons/react";
import { MemoryRouter } from "react-router";
import { theme } from "~/lib/theme/theme";
import { NavbarButton } from "./NavbarButton";

function renderNavbarButton(currentPath: string) {
  render(
    <MantineProvider theme={theme}>
      <MemoryRouter initialEntries={[currentPath]}>
        <NavbarButton id="home" label="Home" to="/" icon={HouseIcon} end />
      </MemoryRouter>
    </MantineProvider>,
  );
  const link = screen.getByRole("link", { name: "Home" });
  return { link, navLinkRoot: link.firstElementChild as HTMLElement };
}

describe("NavbarButton", () => {
  it("shows no background and the brand color on the active item", () => {
    const { link, navLinkRoot } = renderNavbarButton("/");

    expect(link).toHaveAttribute("aria-current", "page");
    expect(navLinkRoot.style.getPropertyValue("--nl-bg")).toBe("transparent");
    expect(navLinkRoot.style.getPropertyValue("--nl-hover")).toBe("transparent");
    expect(navLinkRoot.style.getPropertyValue("--nl-color")).toContain("brand");
  });

  it("shows the dimmed text color and no active styling on inactive items", () => {
    const { link, navLinkRoot } = renderNavbarButton("/somewhere-else");

    expect(link).not.toHaveAttribute("aria-current", "page");
    expect(navLinkRoot.style.color).toBe("var(--mantine-color-dimmed)");
  });
});
