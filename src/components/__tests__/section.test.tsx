import { render, screen } from "@testing-library/react";

import { Section } from "../section";

describe("Section", () => {
  it("should render with default props", () => {
    render(<Section>Test content</Section>);

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render with id prop", () => {
    render(<Section id="test-section">Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveAttribute("id", "test-section");
  });

  it("should render with bg prop", () => {
    render(<Section bg>Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveClass("bg-muted/5");
  });

  it("should render with fullVh prop", () => {
    render(<Section fullVh>Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveClass("min-h-screen");
  });

  it("should render with both bg and fullVh props", () => {
    render(
      <Section bg fullVh>
        Test content
      </Section>
    );

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveClass("bg-muted/5", "min-h-screen");
  });

  it("should pass through other props", () => {
    render(<Section id="test">Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveAttribute("id", "test");
  });

  it("should render as section element by default", () => {
    render(<Section>Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toBeInTheDocument();
    expect(section?.tagName).toBe("SECTION");
  });

  it("should have correct default classes", () => {
    render(<Section>Test content</Section>);

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveClass(
      "w-full",
      "flex",
      "justify-center",
      "items-center",
      "relative",
      "z-2"
    );
  });

  it("should handle all prop combinations", () => {
    render(
      <Section id="test" bg fullVh>
        Test content
      </Section>
    );

    const section = screen.getByText("Test content").closest("section");
    expect(section).toHaveAttribute("id", "test");
    expect(section).toHaveClass("bg-muted/5", "min-h-screen");
  });
});
