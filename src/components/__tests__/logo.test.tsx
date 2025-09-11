import { render, screen } from "@testing-library/react";

// Mock next/font/local
jest.mock("next/font/local", () => ({
  __esModule: true,
  default: () => ({
    className: "mock-font-class",
  }),
}));

import Logo from "../logo";

describe("Logo", () => {
  it("should render without crashing", () => {
    render(<Logo />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should render the letter A", () => {
    render(<Logo />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should apply the font class", () => {
    render(<Logo />);

    const container = screen.getByText("A").closest("div")?.parentElement;
    expect(container).toHaveClass("mock-font-class");
  });

  it("should have correct CSS classes for the main container", () => {
    render(<Logo />);

    const container = screen.getByText("A").closest("div");
    expect(container).toHaveClass(
      "relative",
      "hover:scale-105",
      "transition-transform",
      "duration-200",
      "cursor-pointer"
    );
  });

  it("should have correct CSS classes for the letter", () => {
    render(<Logo />);

    const letter = screen.getByText("A");
    expect(letter).toHaveClass(
      "text-2xl",
      "lg:text-3xl",
      "text-foreground",
      "font-light",
      "tracking-wider"
    );
  });

  it("should be clickable", () => {
    render(<Logo />);

    const container = screen.getByText("A").closest("div");
    expect(container).toHaveClass("cursor-pointer");
  });

  it("should have hover effects", () => {
    render(<Logo />);

    const container = screen.getByText("A").closest("div");
    expect(container).toHaveClass(
      "hover:scale-105",
      "transition-transform",
      "duration-200"
    );
  });

  it("should render as a span element", () => {
    render(<Logo />);

    const letter = screen.getByText("A");
    expect(letter.tagName).toBe("SPAN");
  });

  it("should have proper structure", () => {
    render(<Logo />);

    const container = screen.getByText("A").closest("div");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("should have responsive text sizing", () => {
    render(<Logo />);

    const letter = screen.getByText("A");
    expect(letter).toHaveClass("text-2xl", "lg:text-3xl");
  });

  it("should have proper typography classes", () => {
    render(<Logo />);

    const letter = screen.getByText("A");
    expect(letter).toHaveClass("font-light", "tracking-wider");
  });
});
