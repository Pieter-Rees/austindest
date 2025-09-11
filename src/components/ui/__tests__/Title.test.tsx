import { render, screen } from "@testing-library/react";

import { Title } from "../Title";

describe("Title", () => {
  it("renders with title only", () => {
    render(<Title title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Title"
    );
  });

  it("renders with subtitle", () => {
    render(<Title title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Subtitle"
    );
  });

  it("renders with subTitle (alternative prop)", () => {
    render(<Title title="Test Title" subTitle="Test SubTitle" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test SubTitle")).toBeInTheDocument();
  });

  it("renders with both subtitle and subTitle (subtitle takes precedence)", () => {
    render(
      <Title title="Test Title" subtitle="Subtitle" subTitle="SubTitle Alt" />
    );
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.queryByText("SubTitle Alt")).not.toBeInTheDocument();
  });

  it("renders without title", () => {
    render(<Title subtitle="Test Subtitle" />);
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders without subtitle", () => {
    render(<Title title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("applies correct alignment classes", () => {
    const { rerender } = render(<Title title="Test" align="left" />);
    expect(screen.getByText("Test")).toHaveClass("text-left");

    rerender(<Title title="Test" align="center" />);
    expect(screen.getByText("Test")).toHaveClass("text-center");

    rerender(<Title title="Test" align="right" />);
    expect(screen.getByText("Test")).toHaveClass("text-right");
  });

  it("applies alignment from boolean props", () => {
    const { rerender } = render(<Title title="Test" left />);
    expect(screen.getByText("Test")).toHaveClass("text-left");

    rerender(<Title title="Test" center />);
    expect(screen.getByText("Test")).toHaveClass("text-center");

    rerender(<Title title="Test" right />);
    expect(screen.getByText("Test")).toHaveClass("text-right");
  });

  it("prioritizes align prop over boolean props", () => {
    render(<Title title="Test" align="right" left center />);
    expect(screen.getByText("Test")).toHaveClass("text-right");
  });

  it("defaults to center alignment when no alignment specified", () => {
    render(<Title title="Test" />);
    expect(screen.getByText("Test")).toHaveClass("text-center");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Title title="Test" size="sm" />);
    expect(screen.getByText("Test")).toHaveClass(
      "text-3xl",
      "sm:text-4xl",
      "lg:text-5xl"
    );

    rerender(<Title title="Test" size="md" />);
    expect(screen.getByText("Test")).toHaveClass(
      "text-4xl",
      "sm:text-5xl",
      "lg:text-6xl"
    );

    rerender(<Title title="Test" size="lg" />);
    expect(screen.getByText("Test")).toHaveClass(
      "text-5xl",
      "sm:text-6xl",
      "lg:text-7xl"
    );

    rerender(<Title title="Test" size="xl" />);
    expect(screen.getByText("Test")).toHaveClass(
      "text-6xl",
      "sm:text-7xl",
      "lg:text-8xl"
    );
  });

  it("defaults to xl size", () => {
    render(<Title title="Test" />);
    expect(screen.getByText("Test")).toHaveClass(
      "text-6xl",
      "sm:text-7xl",
      "lg:text-8xl"
    );
  });

  it("applies correct subtitle size classes", () => {
    const { rerender } = render(
      <Title title="Test" subtitle="Sub" size="sm" />
    );
    expect(screen.getByText("Sub")).toHaveClass(
      "text-lg",
      "sm:text-xl",
      "lg:text-2xl"
    );

    rerender(<Title title="Test" subtitle="Sub" size="md" />);
    expect(screen.getByText("Sub")).toHaveClass(
      "text-xl",
      "sm:text-2xl",
      "lg:text-3xl"
    );

    rerender(<Title title="Test" subtitle="Sub" size="lg" />);
    expect(screen.getByText("Sub")).toHaveClass(
      "text-2xl",
      "sm:text-3xl",
      "lg:text-4xl"
    );

    rerender(<Title title="Test" subtitle="Sub" size="xl" />);
    expect(screen.getByText("Sub")).toHaveClass(
      "text-3xl",
      "sm:text-4xl",
      "lg:text-5xl"
    );
  });

  it("applies margin class to subtitle when margin is true", () => {
    render(<Title title="Test" subtitle="Sub" margin />);
    expect(screen.getByText("Sub")).toHaveClass("mt-4");
  });

  it("does not apply margin class to subtitle when margin is false", () => {
    render(<Title title="Test" subtitle="Sub" margin={false} />);
    expect(screen.getByText("Sub")).not.toHaveClass("mt-4");
  });

  it("applies custom className", () => {
    render(<Title title="Test" className="custom-class" />);
    expect(screen.getByText("Test").closest("div")).toHaveClass("custom-class");
  });

  it("applies animation classes", () => {
    render(<Title title="Test" subtitle="Sub" />);
    expect(screen.getByText("Test")).toHaveClass("animate-fade-in");
    expect(screen.getByText("Sub")).toHaveClass("animate-slide-up");
  });

  it("applies base classes", () => {
    render(<Title title="Test" subtitle="Sub" />);
    expect(screen.getByText("Test")).toHaveClass(
      "font-sans",
      "font-light",
      "text-foreground",
      "tracking-tight"
    );
    expect(screen.getByText("Sub")).toHaveClass(
      "font-sans",
      "font-normal",
      "text-muted",
      "tracking-wide"
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Title title="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards additional props", () => {
    render(<Title title="Test" data-testid="title-container" />);
    expect(screen.getByTestId("title-container")).toBeInTheDocument();
  });
});
