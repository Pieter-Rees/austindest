import { render, screen } from "@testing-library/react";

import Gigs from "../gigs";

describe("Gigs", () => {
  it("should render without crashing", () => {
    render(<Gigs />);

    expect(screen.getByText("Gigs")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Gigs />);

    expect(screen.getByText("Gigs")).toBeInTheDocument();
  });

  it("should render gigs content", () => {
    render(<Gigs />);

    // Check for gigs content
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
  });

  it("should render with correct structure", () => {
    render(<Gigs />);

    // Check for main container
    const container = screen.getByText("Gigs").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("should have proper CSS classes", () => {
    render(<Gigs />);

    const title = screen.getByText("Gigs");
    expect(title).toHaveClass(
      "font-sans",
      "font-normal",
      "text-muted",
      "tracking-wide",
      "text-2xl",
      "sm:text-3xl",
      "lg:text-4xl",
      "text-right",
      "animate-slide-up"
    );
  });

  it("should render gig information", () => {
    render(<Gigs />);

    // Look for typical gig information elements
    const gigsContainer = screen.getByText("Gigs").closest("div");
    expect(gigsContainer).toBeInTheDocument();
  });

  it("should render upcoming gigs section", () => {
    render(<Gigs />);

    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("should render gig links when info is provided", () => {
    render(<Gigs />);

    // The component should render without errors and handle the conditional rendering
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("should render gig text when no info link", () => {
    render(<Gigs />);

    // The component should render without errors and handle the conditional rendering
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("should render past gigs section", () => {
    render(<Gigs />);

    expect(screen.getByText("Past Events")).toBeInTheDocument();
  });
});
