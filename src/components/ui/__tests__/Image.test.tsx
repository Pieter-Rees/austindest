import { render, screen } from "@testing-library/react";

import { Image } from "../Image";

// Suppress console warnings for this test suite
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        'Image with src "/test-image.jpg" is using quality "90" which is not configured in images.qualities'
      )
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});

describe("Image", () => {
  const defaultProps = {
    src: "/test-image.jpg",
    alt: "Test image",
  };

  it("should render with default props", () => {
    render(<Image {...defaultProps} />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test image");
    expect(image).toHaveAttribute("width", "800");
    expect(image).toHaveAttribute("height", "600");
  });

  it("should render with custom width and height", () => {
    render(<Image {...defaultProps} width={400} height={300} />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveAttribute("width", "400");
    expect(image).toHaveAttribute("height", "300");
  });

  it("should render with fill prop", () => {
    render(<Image {...defaultProps} fill />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    // fill prop is handled by Next.js Image component internally
  });

  it("should accept custom className", () => {
    render(<Image {...defaultProps} className="custom-class" />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveClass("custom-class", "object-cover");
  });

  it("should forward ref", () => {
    const ref = jest.fn();
    render(<Image {...defaultProps} ref={ref} />);

    expect(ref).toHaveBeenCalled();
  });

  it("should pass through other props", () => {
    render(<Image {...defaultProps} data-testid="image" id="test" />);

    const image = screen.getByTestId("image");
    expect(image).toHaveAttribute("id", "test");
  });

  it("should handle priority prop", () => {
    render(<Image {...defaultProps} priority />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    // priority prop is handled by Next.js Image component internally
  });

  it("should handle quality prop", () => {
    render(<Image {...defaultProps} quality={90} />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
  });

  it("should handle placeholder prop", () => {
    render(
      <Image
        {...defaultProps}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
  });

  it("should handle blurDataURL prop", () => {
    render(
      <Image {...defaultProps} blurDataURL="data:image/jpeg;base64,..." />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
  });

  it("should handle sizes prop", () => {
    render(<Image {...defaultProps} sizes="(max-width: 768px) 100vw, 50vw" />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
  });

  it("should handle style prop", () => {
    const customStyle = { borderRadius: "8px" };
    render(<Image {...defaultProps} style={customStyle} />);

    const image = screen.getByAltText("Test image");
    expect(image).toHaveStyle("border-radius: 8px");
  });
});
