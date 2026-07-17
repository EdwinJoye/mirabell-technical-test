import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the home page content", () => {
    render(<HomePage />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
