import { render, screen } from "@testing-library/react";

// Mock the VideoPlayer component
jest.mock("../ui/VideoPlayer", () => {
  return {
    VideoPlayer: ({
      src,
      width,
      height,
    }: {
      src: string;
      width: string;
      height: string;
    }) => (
      <div
        data-testid="video-player"
        data-src={src}
        data-width={width}
        data-height={height}
      >
        Video Player
      </div>
    ),
  };
});

import Watch from "../watch";

describe("Watch", () => {
  it("should render without crashing", () => {
    render(<Watch />);

    expect(screen.getByText("Watch")).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<Watch />);

    expect(screen.getByText("Watch")).toBeInTheDocument();
  });

  it("should render VideoPlayer component", () => {
    render(<Watch />);

    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toBeInTheDocument();
  });

  it("should pass correct props to VideoPlayer", () => {
    render(<Watch />);

    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toHaveAttribute(
      "data-src",
      "https://youtu.be/3DWK8802N00?t=2546"
    );
    expect(videoPlayer).toHaveAttribute("data-width", "100%");
    expect(videoPlayer).toHaveAttribute("data-height", "500px");
  });

  it("should have correct CSS classes for main container", () => {
    render(<Watch />);

    const container = screen.getByText("Watch").closest("div")
      ?.parentElement?.parentElement;
    expect(container).toHaveClass("w-full", "space-y-8");
  });

  it("should have correct CSS classes for title container", () => {
    render(<Watch />);

    const titleContainer = screen
      .getByText("Watch")
      .closest("div")?.parentElement;
    expect(titleContainer).toHaveClass("my-6", "lg:mb-8", "lg:mt-0");
  });

  it("should have correct CSS classes for video container", () => {
    render(<Watch />);

    const videoContainer = screen.getByTestId("video-player").parentElement;
    expect(videoContainer).toHaveClass(
      "overflow-hidden",
      "rounded-lg",
      "border",
      "border-border"
    );
  });

  it("should render with proper structure", () => {
    render(<Watch />);

    // Check main structure
    expect(screen.getByText("Watch")).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toBeInTheDocument();

    // Check that the video player is wrapped in the correct container
    const videoContainer = screen.getByTestId("video-player").parentElement;
    expect(videoContainer).toHaveClass(
      "overflow-hidden",
      "rounded-lg",
      "border",
      "border-border"
    );
  });

  it("should have proper spacing", () => {
    render(<Watch />);

    const container = screen.getByText("Watch").closest("div")
      ?.parentElement?.parentElement;
    expect(container).toHaveClass("space-y-8");
  });

  it("should have full width", () => {
    render(<Watch />);

    const container = screen.getByText("Watch").closest("div")
      ?.parentElement?.parentElement;
    expect(container).toHaveClass("w-full");
  });

  it("should render YouTube video URL", () => {
    render(<Watch />);

    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toHaveAttribute(
      "data-src",
      "https://youtu.be/3DWK8802N00?t=2546"
    );
  });

  it("should have responsive video dimensions", () => {
    render(<Watch />);

    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toHaveAttribute("data-width", "100%");
    expect(videoPlayer).toHaveAttribute("data-height", "500px");
  });
});
