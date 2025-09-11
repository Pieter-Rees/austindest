import { render, screen } from "@testing-library/react";

import { Container } from "../Container";

describe("Container", () => {
  it("should render with default props", () => {
    render(<Container>Test content</Container>);

    const container = screen.getByText("Test content");
    expect(container).toBeInTheDocument();
    expect(container.tagName).toBe("DIV");
    expect(container).toHaveClass(
      "mx-auto",
      "px-4",
      "sm:px-6",
      "lg:px-8",
      "xl:px-12",
      "max-w-6xl"
    );
  });

  it("should render with different sizes", () => {
    const sizes = ["sm", "md", "lg", "xl", "full"] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Container size={size}>Test</Container>);
      const container = screen.getByText("Test");
      expect(container).toBeInTheDocument();
      unmount();
    });
  });

  it("should render as different element when as prop is provided", () => {
    render(<Container as="section">Test content</Container>);

    const container = screen.getByText("Test content");
    expect(container.tagName).toBe("SECTION");
  });

  it("should accept custom className", () => {
    render(<Container className="custom-class">Test</Container>);

    const container = screen.getByText("Test");
    expect(container).toHaveClass("custom-class");
  });

  it("should forward ref", () => {
    const ref = jest.fn();
    render(<Container ref={ref}>Test</Container>);

    expect(ref).toHaveBeenCalled();
  });

  it("should pass through other props", () => {
    render(
      <Container data-testid="container" id="test">
        Test
      </Container>
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveAttribute("id", "test");
  });

  it("should have correct size classes", () => {
    const { rerender } = render(<Container size="sm">Test</Container>);
    expect(screen.getByText("Test")).toHaveClass("max-w-3xl");

    rerender(<Container size="md">Test</Container>);
    expect(screen.getByText("Test")).toHaveClass("max-w-4xl");

    rerender(<Container size="lg">Test</Container>);
    expect(screen.getByText("Test")).toHaveClass("max-w-6xl");

    rerender(<Container size="xl">Test</Container>);
    expect(screen.getByText("Test")).toHaveClass("max-w-7xl");

    rerender(<Container size="full">Test</Container>);
    expect(screen.getByText("Test")).toHaveClass("max-w-full");
  });
});
