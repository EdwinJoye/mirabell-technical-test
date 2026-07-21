import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { theme } from "~/lib/theme/theme";
import { HomePage } from "./HomePage";

function renderHomePage() {
  render(
    <MantineProvider theme={theme}>
      <HomePage />
    </MantineProvider>,
  );
}

describe("HomePage", () => {
  it("renders the welcome message", () => {
    renderHomePage();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders the developer name", () => {
    renderHomePage();
    expect(screen.getByText("Edwin Joye")).toBeInTheDocument();
  });
});
