import { render, screen } from "@testing-library/react";

// Mock the child components
jest.mock("../socials", () => {
  return function MockSocials() {
    return <div data-testid="socials">Social Links</div>;
  };
});

import Landing from "../landing";

describe("Landing", () => {
  it("should render without crashing", () => {
    render(<Landing />);

    expect(screen.getByText("Austin")).toBeInTheDocument();
    expect(screen.getByText("All About The Groove")).toBeInTheDocument();
  });

  it("should render the main title", () => {
    render(<Landing />);

    expect(screen.getByText("Austin")).toBeInTheDocument();
  });

  it("should render the subtitle", () => {
    render(<Landing />);

    expect(screen.getByText("All About The Groove")).toBeInTheDocument();
  });

  it("should render socials component", () => {
    render(<Landing />);

    expect(screen.getByTestId("socials")).toBeInTheDocument();
  });

  it("should have correct CSS classes for main container", () => {
    render(<Landing />);

    const container = screen.getByText("Austin").closest("div")?.parentElement;
    expect(container).toHaveClass(
      "w-full",
      "h-full",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "text-center",
      "space-y-8"
    );
  });

  it("should have correct CSS classes for socials container", () => {
    render(<Landing />);

    const socialsContainer = screen
      .getByTestId("socials")
      .closest("div")?.parentElement;
    expect(socialsContainer).toHaveClass("flex", "justify-center", "mt-8");
  });

  it("should render with proper structure", () => {
    render(<Landing />);

    // Check that the title component is rendered
    expect(screen.getByText("Austin")).toBeInTheDocument();
    expect(screen.getByText("All About The Groove")).toBeInTheDocument();

    // Check that socials are rendered
    expect(screen.getByTestId("socials")).toBeInTheDocument();
  });

  it("should be centered", () => {
    render(<Landing />);

    const container = screen.getByText("Austin").closest("div")?.parentElement;
    expect(container).toHaveClass(
      "text-center",
      "items-center",
      "justify-center"
    );
  });

  it("should have proper spacing", () => {
    render(<Landing />);

    const container = screen.getByText("Austin").closest("div")?.parentElement;
    expect(container).toHaveClass("space-y-8");
  });
});
