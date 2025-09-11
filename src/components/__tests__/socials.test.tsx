import { render, screen } from "@testing-library/react";

import Socials from "../socials";

describe("Socials", () => {
  it("should render without crashing", () => {
    render(<Socials />);

    expect(screen.getByText("contact@austindest.com")).toBeInTheDocument();
    expect(screen.getByText("@austindestmusic")).toBeInTheDocument();
  });

  it("should render SoundCloud link", () => {
    render(<Socials />);

    const soundcloudLinks = screen.getAllByRole("link");
    const soundcloudLinkElement = soundcloudLinks.find(
      link => link.getAttribute("href") === "https://soundcloud.com/austin_dest"
    );

    expect(soundcloudLinkElement).toBeInTheDocument();
    expect(soundcloudLinkElement).toHaveAttribute("target", "_blank");
    expect(soundcloudLinkElement).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Instagram link", () => {
    render(<Socials />);

    const instagramLinks = screen.getAllByRole("link");
    const instagramLinkElement = instagramLinks.find(
      link =>
        link.getAttribute("href") ===
        "https://www.instagram.com/austindestmusic/"
    );

    expect(instagramLinkElement).toBeInTheDocument();
    expect(instagramLinkElement).toHaveAttribute("target", "_blank");
    expect(instagramLinkElement).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Facebook link", () => {
    render(<Socials />);

    const facebookLinks = screen.getAllByRole("link");
    const facebookLinkElement = facebookLinks.find(
      link =>
        link.getAttribute("href") ===
        "https://www.facebook.com/austindest_music"
    );

    expect(facebookLinkElement).toBeInTheDocument();
    expect(facebookLinkElement).toHaveAttribute("target", "_blank");
    expect(facebookLinkElement).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Spotify link", () => {
    render(<Socials />);

    const spotifyLinks = screen.getAllByRole("link");
    const spotifyLinkElement = spotifyLinks.find(link =>
      link.getAttribute("href")?.includes("open.spotify.com/artist")
    );

    expect(spotifyLinkElement).toBeInTheDocument();
    expect(spotifyLinkElement).toHaveAttribute("target", "_blank");
    expect(spotifyLinkElement).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render email link", () => {
    render(<Socials />);

    const emailLink = screen.getByRole("link", {
      name: "contact@austindest.com",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:contact@austindest.com");
    expect(emailLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should render Instagram handle link", () => {
    render(<Socials />);

    const instagramHandleLink = screen.getByRole("link", {
      name: "@austindestmusic",
    });
    expect(instagramHandleLink).toBeInTheDocument();
    expect(instagramHandleLink).toHaveAttribute(
      "href",
      "https://www.instagram.com/austindestmusic/"
    );
    expect(instagramHandleLink).toHaveAttribute("target", "_blank");
    expect(instagramHandleLink).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("should have correct CSS classes for main container", () => {
    render(<Socials />);

    const container = screen
      .getByText("contact@austindest.com")
      .closest("div")?.parentElement;
    expect(container).toHaveClass("flex", "flex-col", "gap-6");
  });

  it("should have correct CSS classes for social links container", () => {
    render(<Socials />);

    const socialLinksContainer = screen
      .getByText("contact@austindest.com")
      .closest("div")?.parentElement?.firstElementChild;
    expect(socialLinksContainer).toHaveClass("flex", "justify-center", "gap-6");
  });

  it("should have correct CSS classes for social links", () => {
    render(<Socials />);

    const socialLinks = screen.getAllByRole("link").slice(0, 4); // First 4 are social media links
    socialLinks.forEach(link => {
      expect(link).toHaveClass(
        "text-muted",
        "hover:text-foreground",
        "transition-colors",
        "duration-200"
      );
    });
  });

  it("should have correct CSS classes for contact links", () => {
    render(<Socials />);

    const emailLink = screen.getByRole("link", {
      name: "contact@austindest.com",
    });
    const instagramHandleLink = screen.getByRole("link", {
      name: "@austindestmusic",
    });

    expect(emailLink).toHaveClass(
      "text-sm",
      "text-muted",
      "hover:text-foreground",
      "transition-colors",
      "duration-200"
    );

    expect(instagramHandleLink).toHaveClass(
      "text-sm",
      "text-muted",
      "hover:text-foreground",
      "transition-colors",
      "duration-200"
    );
  });

  it("should render SVG icons for social links", () => {
    render(<Socials />);

    const svgElements = document.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it("should have hover effects on SVG icons", () => {
    render(<Socials />);

    const svgElements = document.querySelectorAll("svg");
    svgElements.forEach(svg => {
      expect(svg).toHaveClass(
        "hover:scale-110",
        "transition-transform",
        "duration-200"
      );
    });
  });

  it("should render horizontal rule", () => {
    render(<Socials />);

    const hr = screen.getByRole("separator");
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass("border-border");
  });

  it("should have correct CSS classes for contact section", () => {
    render(<Socials />);

    const contactSection = screen
      .getByText("contact@austindest.com")
      .closest("div");
    expect(contactSection).toHaveClass(
      "flex",
      "items-center",
      "flex-col",
      "justify-center",
      "space-y-2"
    );
  });

  it("should render with proper structure", () => {
    render(<Socials />);

    // Check that all expected elements are present
    expect(screen.getByText("contact@austindest.com")).toBeInTheDocument();
    expect(screen.getByText("@austindestmusic")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();

    // Check that we have social media links
    const socialLinks = screen.getAllByRole("link");
    expect(socialLinks.length).toBeGreaterThanOrEqual(6);
  });
});
