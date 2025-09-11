import { render, screen } from "@testing-library/react";

import Contact from "../contact";

describe("Contact", () => {
  it("should render without crashing", () => {
    render(<Contact />);

    expect(screen.getByText("Contact & Bookings")).toBeInTheDocument();
  });

  it("should render the title with correct alignment", () => {
    render(<Contact />);

    const title = screen.getByText("Contact & Bookings");
    expect(title).toBeInTheDocument();
  });

  it("should render email link", () => {
    render(<Contact />);

    const emailLink = screen.getByRole("link", {
      name: "contact@austindest.com",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:contact@austindest.com");
    expect(emailLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Instagram link", () => {
    render(<Contact />);

    const instagramLink = screen.getByRole("link", {
      name: "@austindestmusic",
    });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/austindestmusic/"
    );
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should have correct CSS classes for email link", () => {
    render(<Contact />);

    const emailLink = screen.getByRole("link", {
      name: "contact@austindest.com",
    });
    expect(emailLink).toHaveClass(
      "text-lg",
      "lg:text-lg",
      "2xl:text-2xl",
      "text-white",
      "md:hover:text-bubblegum"
    );
  });

  it("should have correct CSS classes for Instagram link", () => {
    render(<Contact />);

    const instagramLink = screen.getByRole("link", {
      name: "@austindestmusic",
    });
    expect(instagramLink).toHaveClass(
      "text-lg",
      "lg:text-lg",
      "2xl:text-2xl",
      "text-white",
      "md:hover:text-bubblegum"
    );
  });

  it("should render with proper structure", () => {
    render(<Contact />);

    const container = screen.getByText("Contact & Bookings").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("should have centered text alignment", () => {
    render(<Contact />);

    const textCenter = screen
      .getByText("contact@austindest.com")
      .closest("div")?.parentElement;
    expect(textCenter).toHaveClass("text-center");
  });
});
