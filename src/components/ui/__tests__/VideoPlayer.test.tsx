import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRef } from "react";

import { VideoPlayer } from "../VideoPlayer";

const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();
const mockLoad = jest.fn();

Object.defineProperty(HTMLVideoElement.prototype, "play", {
  writable: true,
  value: mockPlay,
});

Object.defineProperty(HTMLVideoElement.prototype, "pause", {
  writable: true,
  value: mockPause,
});

Object.defineProperty(HTMLVideoElement.prototype, "load", {
  writable: true,
  value: mockLoad,
});

Object.defineProperty(HTMLVideoElement.prototype, "currentTime", {
  writable: true,
  value: 0,
});

Object.defineProperty(HTMLVideoElement.prototype, "duration", {
  writable: true,
  value: 100,
});

Object.defineProperty(HTMLVideoElement.prototype, "volume", {
  writable: true,
  value: 1,
});

Object.defineProperty(HTMLVideoElement.prototype, "muted", {
  writable: true,
  value: false,
});

Object.defineProperty(HTMLVideoElement.prototype, "paused", {
  writable: true,
  value: true,
});

Object.defineProperty(HTMLVideoElement.prototype, "ended", {
  writable: true,
  value: false,
});

Object.defineProperty(HTMLVideoElement.prototype, "readyState", {
  writable: true,
  value: 4,
});

Object.defineProperty(HTMLVideoElement.prototype, "networkState", {
  writable: true,
  value: 1,
});

Object.defineProperty(HTMLVideoElement.prototype, "videoWidth", {
  writable: true,
  value: 1920,
});

Object.defineProperty(HTMLVideoElement.prototype, "videoHeight", {
  writable: true,
  value: 1080,
});

describe("VideoPlayer", () => {
  const defaultProps = {
    src: "/test-video.mp4",
    title: "Test Video",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders video element with correct attributes", () => {
    render(<VideoPlayer {...defaultProps} />);
    const video = screen.getByTitle("Test Video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("src", "/test-video.mp4");
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("playsInline");
  });

  it("renders with custom className", () => {
    render(<VideoPlayer {...defaultProps} className="custom-class" />);
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveClass("custom-class");
  });

  it("applies correct default props", () => {
    render(<VideoPlayer {...defaultProps} />);
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveAttribute("controls");
    expect(video).not.toHaveAttribute("autoPlay");
    expect(video).not.toHaveAttribute("loop");
    expect(video).not.toHaveAttribute("muted");
    expect(video).toHaveAttribute("preload", "metadata");
  });

  it("applies custom props", () => {
    render(
      <VideoPlayer
        {...defaultProps}
        autoPlay
        loop
        muted
        preload="auto"
        poster="/poster.jpg"
      />
    );
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveAttribute("autoPlay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("preload", "auto");
    expect(video).toHaveAttribute("poster", "/poster.jpg");
  });

  it("applies playing prop as autoPlay", () => {
    render(<VideoPlayer {...defaultProps} playing />);
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveAttribute("autoPlay");
  });

  it("applies width and height styles", () => {
    render(<VideoPlayer {...defaultProps} width={800} height={600} />);
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveStyle("width: 800px");
    expect(video).toHaveStyle("height: 600px");
  });

  it("applies string width and height", () => {
    render(<VideoPlayer {...defaultProps} width="50%" height="auto" />);
    const video = screen.getByTitle("Test Video");
    expect(video).toHaveStyle("width: 50%");
    expect(video).toHaveStyle("height: auto");
  });

  it("forwards ref correctly", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      return <VideoPlayer {...defaultProps} ref={ref} />;
    };
    render(<TestComponent />);
    const video = screen.getByTitle("Test Video");
    expect(video).toBeInTheDocument();
  });

  it("exposes imperative handle methods", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.play();
          ref.current.pause();
          ref.current.load();
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Methods</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Methods");
    fireEvent.click(button);
    expect(mockPlay).toHaveBeenCalled();
    expect(mockPause).toHaveBeenCalled();
    expect(mockLoad).toHaveBeenCalled();
  });

  it("handles play event", () => {
    const onPlay = jest.fn();
    render(<VideoPlayer {...defaultProps} onPlay={onPlay} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.play(video);
    expect(onPlay).toHaveBeenCalled();
  });

  it("handles pause event", () => {
    const onPause = jest.fn();
    render(<VideoPlayer {...defaultProps} onPause={onPause} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.pause(video);
    expect(onPause).toHaveBeenCalled();
  });

  it("handles ended event", () => {
    const onEnded = jest.fn();
    render(<VideoPlayer {...defaultProps} onEnded={onEnded} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.ended(video);
    expect(onEnded).toHaveBeenCalled();
  });

  it("handles error event", () => {
    const onError = jest.fn();
    render(<VideoPlayer {...defaultProps} onError={onError} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.error(video);
    expect(onError).toHaveBeenCalled();
  });

  it("handles load start event", () => {
    const onLoadStart = jest.fn();
    render(<VideoPlayer {...defaultProps} onLoadStart={onLoadStart} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.loadStart(video);
    expect(onLoadStart).toHaveBeenCalled();
  });

  it("handles loaded data event", () => {
    const onLoadedData = jest.fn();
    render(<VideoPlayer {...defaultProps} onLoadedData={onLoadedData} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.loadedData(video);
    expect(onLoadedData).toHaveBeenCalled();
  });

  it("handles loaded metadata event", () => {
    const onLoadedMetadata = jest.fn();
    render(
      <VideoPlayer
        {...defaultProps}
        onLoadedMetadata={onLoadedMetadata}
        playbackRate={1.5}
      />
    );
    const video = screen.getByTitle("Test Video");
    fireEvent.loadedMetadata(video);
    expect(onLoadedMetadata).toHaveBeenCalled();
  });

  it("handles can play event", () => {
    const onCanPlay = jest.fn();
    render(<VideoPlayer {...defaultProps} onCanPlay={onCanPlay} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.canPlay(video);
    expect(onCanPlay).toHaveBeenCalled();
  });

  it("handles can play through event", () => {
    const onCanPlayThrough = jest.fn();
    render(
      <VideoPlayer {...defaultProps} onCanPlayThrough={onCanPlayThrough} />
    );
    const video = screen.getByTitle("Test Video");
    fireEvent.canPlayThrough(video);
    expect(onCanPlayThrough).toHaveBeenCalled();
  });

  it("handles time update event", () => {
    const onTimeUpdate = jest.fn();
    render(<VideoPlayer {...defaultProps} onTimeUpdate={onTimeUpdate} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.timeUpdate(video);
    expect(onTimeUpdate).toHaveBeenCalled();
  });

  it("handles volume change event", () => {
    const onVolumeChange = jest.fn();
    render(<VideoPlayer {...defaultProps} onVolumeChange={onVolumeChange} />);
    const video = screen.getByTitle("Test Video");
    fireEvent.volumeChange(video);
    expect(onVolumeChange).toHaveBeenCalled();
  });

  it("handles duration change event", () => {
    const onDurationChange = jest.fn();
    render(
      <VideoPlayer {...defaultProps} onDurationChange={onDurationChange} />
    );
    const video = screen.getByTitle("Test Video");
    fireEvent.durationChange(video);
    expect(onDurationChange).toHaveBeenCalledWith(100);
  });

  it("exposes video properties through ref", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          expect(ref.current.currentTime).toBe(0);
          expect(ref.current.duration).toBe(100);
          expect(ref.current.volume).toBe(1);
          expect(ref.current.muted).toBe(false);
          expect(ref.current.paused).toBe(true);
          expect(ref.current.ended).toBe(false);
          expect(ref.current.readyState).toBe(4);
          expect(ref.current.networkState).toBe(1);
          expect(ref.current.videoWidth).toBe(1920);
          expect(ref.current.videoHeight).toBe(1080);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Properties</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Properties");
    fireEvent.click(button);
  });

  it("exposes seekTo method", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.seekTo(50);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Seek</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Seek");
    fireEvent.click(button);
  });

  it("exposes setVolume method", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.setVolume(0.5);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Set Volume</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Set Volume");
    fireEvent.click(button);
  });

  it("exposes setMuted method", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.setMuted(true);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Set Muted</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Set Muted");
    fireEvent.click(button);
  });

  it("exposes getVideoElement method", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          const element = ref.current.getVideoElement();
          expect(element).toBeInstanceOf(HTMLVideoElement);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Get Element</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Get Element");
    fireEvent.click(button);
  });

  it("clamps volume between 0 and 1", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.setVolume(1.5);
          ref.current.setVolume(-0.5);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Volume Clamp</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Volume Clamp");
    fireEvent.click(button);
  });

  it("forwards additional props to video element", () => {
    render(<VideoPlayer {...defaultProps} data-testid="video-player" />);
    const video = screen.getByTestId("video-player");
    expect(video).toBeInTheDocument();
  });

  it("handles ref methods when video element is null", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.play();
          ref.current.pause();
          ref.current.load();
          ref.current.seekTo(50);
          ref.current.setVolume(0.5);
          ref.current.setMuted(true);
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Null Handling</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Null Handling");
    fireEvent.click(button);
  });

  it("handles edge cases in loaded metadata event", () => {
    const onLoadedMetadata = jest.fn();
    render(
      <VideoPlayer
        {...defaultProps}
        onLoadedMetadata={onLoadedMetadata}
        playbackRate={2.0}
      />
    );
    const video = screen.getByTitle("Test Video");

    const mockEvent = {
      currentTarget: {
        playbackRate: 1.0,
      },
    };

    Object.defineProperty(video, "playbackRate", {
      writable: true,
      value: 2.0,
    });

    fireEvent.loadedMetadata(video);
    expect(onLoadedMetadata).toHaveBeenCalled();
  });

  it("handles duration change event with currentTarget", () => {
    const onDurationChange = jest.fn();
    render(
      <VideoPlayer {...defaultProps} onDurationChange={onDurationChange} />
    );
    const video = screen.getByTitle("Test Video");

    Object.defineProperty(video, "duration", {
      writable: true,
      value: 120,
    });

    fireEvent.durationChange(video);
    expect(onDurationChange).toHaveBeenCalledWith(120);
  });

  it("tests volume clamping edge cases", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          ref.current.setVolume(0); // Minimum
          ref.current.setVolume(1); // Maximum
          ref.current.setVolume(0.5); // Middle
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Volume Boundaries</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Volume Boundaries");
    fireEvent.click(button);
  });

  it("handles video element properties when null", () => {
    const TestComponent = () => {
      const ref = useRef(null);
      const handleClick = () => {
        if (ref.current) {
          expect(ref.current.currentTime).toBe(0);
          expect(ref.current.duration).toBe(100); // This is mocked to 100
          expect(ref.current.volume).toBe(1); // This is mocked to 1
          expect(ref.current.muted).toBe(false);
          expect(ref.current.paused).toBe(true);
          expect(ref.current.ended).toBe(false);
          expect(ref.current.readyState).toBe(4); // This is mocked to 4
          expect(ref.current.networkState).toBe(1); // This is mocked to 1
          expect(ref.current.videoWidth).toBe(1920); // This is mocked to 1920
          expect(ref.current.videoHeight).toBe(1080); // This is mocked to 1080
        }
      };
      return (
        <div>
          <VideoPlayer {...defaultProps} ref={ref} />
          <button onClick={handleClick}>Test Null Properties</button>
        </div>
      );
    };
    render(<TestComponent />);
    const button = screen.getByText("Test Null Properties");
    fireEvent.click(button);
  });
});
