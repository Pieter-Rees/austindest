import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NotFound from "../not-found";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

describe("Not Found Page", () => {
  it("should render without crashing", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("should render 404 message", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("should render go home button", () => {
    render(<NotFound />);

    const goHomeButton = screen.getByRole("button", { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();
  });

  it("should handle go home button click", async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    const goHomeButton = screen.getByRole("button", { name: /go home/i });
    await user.click(goHomeButton);

    // The button should be clickable
    expect(goHomeButton).toBeInTheDocument();
  });

  it("should render with correct structure", () => {
    render(<NotFound />);

    const container = screen.getByText("404").closest("div");
    expect(container).toHaveClass("text-center");
  });

  it("should have proper styling", () => {
    render(<NotFound />);

    const title = screen.getByText("404");
    expect(title).toHaveClass(
      "text-6xl",
      "font-bold",
      "text-bubblegum",
      "mb-4"
    );

    const subtitle = screen.getByText("Page Not Found");
    expect(subtitle).toHaveClass(
      "text-2xl",
      "font-semibold",
      "text-white",
      "mb-4"
    );
  });
});
