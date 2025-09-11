import { render, screen } from "@testing-library/react";

import Bio from "../bio";

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe("Bio", () => {
  it("should render without crashing", () => {
    render(<Bio />);

    expect(screen.getByText("Bio")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Bio />);

    expect(screen.getByText("Bio")).toBeInTheDocument();
  });

  it("should render bio content", () => {
    render(<Bio />);

    // Check for bio content text
    expect(screen.getByText(/Austin Dest/i)).toBeInTheDocument();
  });

  it("should render images", () => {
    render(<Bio />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("should have correct image attributes", () => {
    render(<Bio />);

    const images = screen.getAllByRole("img");
    images.forEach(image => {
      expect(image).toHaveAttribute("alt");
      expect(image.alt).not.toBe("");
    });
  });

  it("should render with correct structure", () => {
    render(<Bio />);

    // Check for main container
    const container = screen.getByText("Bio").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("should have proper CSS classes", () => {
    render(<Bio />);

    const title = screen.getByText("Bio");
    expect(title).toHaveClass(
      "font-sans",
      "font-normal",
      "text-muted",
      "tracking-wide",
      "text-2xl",
      "sm:text-3xl",
      "lg:text-4xl",
      "text-left",
      "animate-slide-up"
    );
  });
});
