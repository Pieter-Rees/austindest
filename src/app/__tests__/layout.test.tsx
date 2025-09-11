import { render } from "@testing-library/react";

import RootLayout from "../layout";

// Mock Next.js font
jest.mock("next/font/google", () => ({
  Inter: () => ({
    className: "mock-inter-class",
    variable: "--font-inter",
  }),
}));

// Suppress console errors for this test suite
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("In HTML, <html> cannot be a child of <div>")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Test Content</div>
      </RootLayout>
    );

    expect(
      container.querySelector('[data-testid="child"]')
    ).toBeInTheDocument();
    expect(container.querySelector('[data-testid="child"]')).toHaveTextContent(
      "Test Content"
    );
  });

  it("renders with multiple children", () => {
    const { container } = render(
      <RootLayout>
        <header>Header</header>
        <main>Main Content</main>
        <footer>Footer</footer>
      </RootLayout>
    );

    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("handles empty children", () => {
    const { container } = render(<RootLayout>{null}</RootLayout>);

    expect(container).toBeInTheDocument();
  });

  it("handles undefined children", () => {
    const { container } = render(<RootLayout>{undefined}</RootLayout>);

    expect(container).toBeInTheDocument();
  });
});
