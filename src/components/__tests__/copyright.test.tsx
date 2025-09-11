import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock react-scroll
jest.mock("react-scroll", () => ({
  animateScroll: {
    scrollToTop: jest.fn(),
  },
}));

// Mock the child components
jest.mock("../logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">A</div>;
  };
});

jest.mock("../socials", () => {
  return function MockSocials() {
    return <div data-testid="socials">Social Links</div>;
  };
});

import Copyright from "../copyright";

describe("Copyright", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<Copyright />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("socials")).toBeInTheDocument();
  });

  it("should render current year in copyright", () => {
    render(<Copyright />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Copyright © ${currentYear}`)).toBeInTheDocument();
  });

  it("should render artist name", () => {
    render(<Copyright />);

    expect(screen.getByText("Austin Dest")).toBeInTheDocument();
  });

  it("should render logo component", () => {
    render(<Copyright />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("should render socials component", () => {
    render(<Copyright />);

    expect(screen.getByTestId("socials")).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    render(<Copyright />);

    const container = screen.getByTestId("logo").closest("div")?.parentElement
      ?.parentElement?.parentElement;
    expect(container).toHaveClass(
      "relative",
      "z-3",
      "grid",
      "lg:grid-cols-2",
      "gap-4",
      "p-8",
      "bg-black/90",
      "backdrop-blur-md"
    );
  });

  it("should have clickable logo that calls scrollToTop", async () => {
    const { animateScroll } = require("react-scroll");
    const user = userEvent.setup();

    render(<Copyright />);

    const logoContainer = screen
      .getByTestId("logo")
      .closest("div")?.parentElement;
    expect(logoContainer).toHaveClass("cursor-pointer");

    await user.click(logoContainer!);

    expect(animateScroll.scrollToTop).toHaveBeenCalledTimes(1);
  });

  it("should render horizontal rule on mobile", () => {
    render(<Copyright />);

    const hr = screen.getByRole("separator");
    expect(hr).toBeInTheDocument();
  });

  it("should have correct text styling", () => {
    render(<Copyright />);

    const copyrightText = screen.getByText(/Copyright ©/);
    const artistText = screen.getByText("Austin Dest");

    expect(copyrightText).toHaveClass(
      "text-center",
      "2xl:text-2xl",
      "mt-4",
      "text-white"
    );
    expect(artistText).toHaveClass("text-center", "2xl:text-2xl", "text-white");
  });

  it("should have proper grid layout", () => {
    render(<Copyright />);

    const gridContainer = screen.getByTestId("logo").closest("div")
      ?.parentElement?.parentElement?.parentElement;
    expect(gridContainer).toHaveClass("grid", "lg:grid-cols-2");
  });
});
