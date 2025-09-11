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
  const mockError = {
    message: "Test error",
    digest: "test-digest",
  } as Error & { digest?: string };
  const mockReset = jest.fn();

  beforeEach(() => {
    mockReset.mockClear();
  });

  it("should render without crashing", () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should render error message", () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
  });

  it("should render try again button", () => {
    render(<Error error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("should handle try again button click", async () => {
    const user = userEvent.setup();
    render(<Error error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", { name: /try again/i });
    await user.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("should render with correct structure", () => {
    render(<Error error={mockError} reset={mockReset} />);

    const container = screen.getByText("Something went wrong!").closest("div");
    expect(container).toHaveClass("text-center");
  });

  it("should have proper styling", () => {
    render(<Error error={mockError} reset={mockReset} />);

    const title = screen.getByText("Something went wrong!");
    expect(title).toHaveClass("text-4xl", "font-bold", "text-white", "mb-4");
  });
});
