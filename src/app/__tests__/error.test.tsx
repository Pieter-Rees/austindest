import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Error from "../error";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

// Suppress console errors for this test suite
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (args[0] === undefined) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("Error Page", () => {
  it("should render without crashing", () => {
    render(<Error />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(<Error />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should render try again button", () => {
    render(<Error />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("should handle try again button click", async () => {
    const user = userEvent.setup();
    render(<Error />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    await user.click(tryAgainButton);

    // The button should be clickable
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("should render with correct structure", () => {
    render(<Error />);

    const container = screen.getByText("Something went wrong!").closest("div");
    expect(container).toHaveClass("text-center");
  });

  it("should have proper styling", () => {
    render(<Error />);

    const title = screen.getByText("Something went wrong!");
    expect(title).toHaveClass("text-4xl", "font-bold", "text-white", "mb-4");
  });
});
