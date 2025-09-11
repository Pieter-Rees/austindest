import { render, screen } from "@testing-library/react";

import LandingBg from "../landingBg";

describe("LandingBg", () => {
  it("should render without crashing", () => {
    render(<LandingBg />);

    // The component renders a div, so we check for its presence
    const background = document.querySelector(".fixed");
    expect(background).toBeInTheDocument();
  });

  it("should render with correct CSS classes", () => {
    render(<LandingBg />);

    const background = document.querySelector(".fixed");
    expect(background).toHaveClass(
      "fixed",
      "left-0",
      "right-0",
      "h-screen",
      "z-0",
      "bg-gradient-to-br",
      "from-background",
      "via-muted/5",
      "to-background"
    );
  });

  it("should be positioned fixed", () => {
    render(<LandingBg />);

    const background = document.querySelector(".fixed");
    expect(background).toHaveClass("fixed", "left-0", "right-0");
  });

  it("should have full screen height", () => {
    render(<LandingBg />);

    const background = document.querySelector(".fixed");
    expect(background).toHaveClass("h-screen");
  });

  it("should have correct z-index", () => {
    render(<LandingBg />);

    const background = document.querySelector(".fixed");
    expect(background).toHaveClass("z-0");
  });

  it("should have gradient background", () => {
    render(<LandingBg />);

    const background = document.querySelector(".fixed");
    expect(background).toHaveClass(
      "bg-gradient-to-br",
      "from-background",
      "via-muted/5",
      "to-background"
    );
  });

  it("should render as a div element", () => {
    render(<LandingBg />);

    const background = document.querySelector("div.fixed");
    expect(background).toBeInTheDocument();
    expect(background?.tagName).toBe("DIV");
  });
});
