import { render, screen } from "@testing-library/react";

import Loading from "../loading";

describe("Loading", () => {
  it("renders PageLoading component", () => {
    render(<Loading />);

    expect(screen.getByText("Loading Austin Dest...")).toBeInTheDocument();
  });

  it("renders loading spinner", () => {
    render(<Loading />);

    const spinner = document.querySelector('svg[class*="animate-spin"]');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });

  it("displays loading text", () => {
    render(<Loading />);

    expect(screen.getByText("Loading Austin Dest...")).toBeInTheDocument();
  });

  it("has correct loading container structure", () => {
    render(<Loading />);

    const outerContainer = document.querySelector(".min-h-screen");
    expect(outerContainer).toHaveClass(
      "min-h-screen",
      "flex",
      "items-center",
      "justify-center",
      "bg-black"
    );
  });
});
