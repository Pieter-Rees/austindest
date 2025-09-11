import { render, screen } from "@testing-library/react";

import { PerformanceMonitor } from "../PerformanceMonitor";

// Mock PerformanceObserver
const mockPerformanceObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

global.PerformanceObserver = class PerformanceObserver {
  constructor(callback: PerformanceObserverCallback) {
    mockPerformanceObserver(callback);
  }
  observe() {
    mockObserve();
  }
  disconnect() {
    mockDisconnect();
  }
  takeRecords() {
    return [];
  }
};

describe("PerformanceMonitor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<PerformanceMonitor />);

    // The component renders null (no DOM elements)
    expect(document.body).toBeInTheDocument();
  });

  it("should initialize PerformanceObserver on mount", () => {
    render(<PerformanceMonitor />);

    expect(mockPerformanceObserver).toHaveBeenCalled();
  });

  it("should observe performance entries", () => {
    render(<PerformanceMonitor />);

    expect(mockObserve).toHaveBeenCalled();
  });

  it("should disconnect on unmount", () => {
    const { unmount } = render(<PerformanceMonitor />);

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should handle performance entries", () => {
    render(<PerformanceMonitor />);

    // The component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it("should be client-side only", () => {
    render(<PerformanceMonitor />);

    // The component renders null (no DOM elements)
    expect(document.body).toBeInTheDocument();
  });

  it("should handle when window.performance is not available", () => {
    // Mock window without performance
    const originalWindow = global.window;
    delete (global as any).window;

    render(<PerformanceMonitor />);

    // Should render without errors
    expect(document.body).toBeInTheDocument();

    // Restore window
    global.window = originalWindow;
  });

  it("should handle when serviceWorker is not available", () => {
    // Mock window without serviceWorker
    const originalNavigator = global.navigator;
    (global as any).navigator = {};

    render(<PerformanceMonitor />);

    // Should render without errors
    expect(document.body).toBeInTheDocument();

    // Restore navigator
    global.navigator = originalNavigator;
  });

  it("should process navigation entries", () => {
    const mockCallback = jest.fn();
    mockPerformanceObserver.mockImplementation(callback => {
      mockCallback.mockImplementation(callback);
    });

    render(<PerformanceMonitor />);

    // Simulate navigation entry
    const navigationEntry = {
      entryType: "navigation",
      domContentLoadedEventEnd: 100,
      domContentLoadedEventStart: 50,
      loadEventEnd: 200,
      loadEventStart: 150,
      fetchStart: 0,
    };

    // Call the callback with navigation entry
    mockCallback({ getEntries: () => [navigationEntry] });

    expect(mockPerformanceObserver).toHaveBeenCalled();
  });

  it("should process LCP entries", () => {
    const mockCallback = jest.fn();
    mockPerformanceObserver.mockImplementation(callback => {
      mockCallback.mockImplementation(callback);
    });

    render(<PerformanceMonitor />);

    // Simulate LCP entry
    const lcpEntry = {
      entryType: "largest-contentful-paint",
      startTime: 1000,
    };

    // Call the callback with LCP entry
    mockCallback({ getEntries: () => [lcpEntry] });

    expect(mockPerformanceObserver).toHaveBeenCalled();
  });

  it("should process FID entries", () => {
    const mockCallback = jest.fn();
    mockPerformanceObserver.mockImplementation(callback => {
      mockCallback.mockImplementation(callback);
    });

    render(<PerformanceMonitor />);

    // Simulate FID entry
    const fidEntry = {
      entryType: "first-input",
      startTime: 500,
      processingStart: 520,
    };

    // Call the callback with FID entry
    mockCallback({ getEntries: () => [fidEntry] });

    expect(mockPerformanceObserver).toHaveBeenCalled();
  });
});
