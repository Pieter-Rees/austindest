import { render, screen } from "@testing-library/react";

import Listen from "../listen";

describe("Listen", () => {
  it("should render without crashing", () => {
    render(<Listen />);

    expect(screen.getByText("Listen")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Listen />);

    expect(screen.getByText("Listen")).toBeInTheDocument();
  });

  it("should render SoundCloud iframe", () => {
    render(<Listen />);

    const soundcloudIframe = screen.getByTitle("soundcloud sets");
    expect(soundcloudIframe).toBeInTheDocument();
    expect(soundcloudIframe).toHaveAttribute(
      "src",
      expect.stringContaining("soundcloud.com")
    );
    expect(soundcloudIframe).toHaveAttribute("width", "100%");
    expect(soundcloudIframe).toHaveAttribute("height", "600px");
    expect(soundcloudIframe).toHaveAttribute("loading", "lazy");
  });

  it("should render Spotify artist iframe", () => {
    render(<Listen />);

    const allIframes = document.querySelectorAll("iframe");
    const artistIframe = Array.from(allIframes).find(iframe =>
      iframe.getAttribute("src")?.includes("open.spotify.com/embed/artist")
    );

    expect(artistIframe).toBeInTheDocument();
    expect(artistIframe).toHaveAttribute("width", "100%");
    expect(artistIframe).toHaveAttribute("height", "152");
    expect(artistIframe).toHaveAttribute("loading", "lazy");
  });

  it("should render Spotify track iframes", () => {
    render(<Listen />);

    const allIframes = document.querySelectorAll("iframe");
    const trackIframes = Array.from(allIframes).filter(iframe =>
      iframe.getAttribute("src")?.includes("open.spotify.com/embed/track")
    );

    expect(trackIframes).toHaveLength(2);
    trackIframes.forEach(iframe => {
      expect(iframe).toHaveAttribute("width", "100%");
      expect(iframe).toHaveAttribute("height", "152");
      expect(iframe).toHaveAttribute("loading", "lazy");
    });
  });

  it("should have correct CSS classes for main container", () => {
    render(<Listen />);

    const container = screen.getByText("Listen").closest("div")
      ?.parentElement?.parentElement;
    expect(container).toHaveClass("space-y-8");
  });

  it("should have correct CSS classes for title container", () => {
    render(<Listen />);

    const titleContainer = screen
      .getByText("Listen")
      .closest("div")?.parentElement;
    expect(titleContainer).toHaveClass("my-6", "lg:mb-8", "lg:mt-0");
  });

  it("should have correct CSS classes for grid container", () => {
    render(<Listen />);

    const gridContainer = screen.getByTitle("soundcloud sets").closest("div")
      ?.parentElement?.parentElement;
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "lg:grid-cols-2",
      "gap-8"
    );
  });

  it("should have correct CSS classes for SoundCloud container", () => {
    render(<Listen />);

    const soundcloudContainer = screen
      .getByTitle("soundcloud sets")
      .closest("div")?.parentElement;
    expect(soundcloudContainer).toHaveClass("h-96", "lg:h-auto");
  });

  it("should have correct CSS classes for SoundCloud iframe wrapper", () => {
    render(<Listen />);

    const iframeWrapper = screen.getByTitle("soundcloud sets").closest("div");
    expect(iframeWrapper).toHaveClass(
      "rounded-lg",
      "border",
      "border-border",
      "overflow-hidden"
    );
  });

  it("should have correct CSS classes for Spotify container", () => {
    render(<Listen />);

    const spotifyContainer = screen.getByTitle("soundcloud sets").closest("div")
      ?.parentElement?.nextElementSibling;
    expect(spotifyContainer).toHaveClass(
      "flex",
      "flex-col",
      "gap-4",
      "lg:gap-6"
    );
  });

  it("should have correct CSS classes for Spotify iframe wrappers", () => {
    render(<Listen />);

    const allIframes = screen
      .getAllByRole("generic")
      .filter(el => el.tagName === "IFRAME");
    const spotifyIframes = allIframes.filter(iframe =>
      iframe.getAttribute("src")?.includes("open.spotify.com")
    );

    spotifyIframes.forEach(iframe => {
      const wrapper = iframe.closest("div");
      expect(wrapper).toHaveClass(
        "overflow-hidden",
        "rounded-lg",
        "border",
        "border-border"
      );
    });
  });

  it("should render with proper structure", () => {
    render(<Listen />);

    // Check main structure
    expect(screen.getByText("Listen")).toBeInTheDocument();
    expect(screen.getByTitle("soundcloud sets")).toBeInTheDocument();

    // Check that we have the expected number of iframes
    const allIframes = document.querySelectorAll("iframe");
    expect(allIframes.length).toBeGreaterThan(0);
  });
});
