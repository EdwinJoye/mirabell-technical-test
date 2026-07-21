import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { MemoryRouter } from "react-router";
import { ComingSoonPage } from "./ComingSoonPage";

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>,
  );
}

describe("ComingSoonPage", () => {
  it("renders the coming soon title", () => {
    renderWithProviders(<ComingSoonPage />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("renders the countdown message", () => {
    renderWithProviders(<ComingSoonPage />);
    expect(screen.getByText(/Redirecting to home in/)).toBeInTheDocument();
  });
});
