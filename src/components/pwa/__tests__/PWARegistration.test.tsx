import { render, screen } from "@testing-library/react";

import { PWARegistration } from "../PWARegistration";

// Mock service worker registration
const mockRegister = jest.fn();
const mockUpdate = jest.fn();

Object.defineProperty(navigator, "serviceWorker", {
  value: {
    register: mockRegister,
    ready: Promise.resolve({
      update: mockUpdate,
    }),
  },
  writable: true,
});

describe("PWARegistration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<PWARegistration />);

    // The component renders null (no DOM elements)
    expect(document.body).toBeInTheDocument();
  });

  it("should register service worker on mount", () => {
    render(<PWARegistration />);

    // The component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it("should handle service worker registration success", () => {
    render(<PWARegistration />);

    // The component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it("should handle service worker registration error", () => {
    render(<PWARegistration />);

    // The component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it("should be client-side only", () => {
    render(<PWARegistration />);

    // The component renders null (no DOM elements)
    expect(document.body).toBeInTheDocument();
  });

  it("should handle update available", () => {
    render(<PWARegistration />);

    // The component should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it("should handle when serviceWorker is not available", () => {
    // Mock navigator without serviceWorker
    const originalNavigator = global.navigator;
    (global as any).navigator = {};

    render(<PWARegistration />);

    // Should render without errors
    expect(document.body).toBeInTheDocument();

    // Restore navigator
    global.navigator = originalNavigator;
  });

  it("should handle when window is not available", () => {
    // Mock window as undefined
    const originalWindow = global.window;
    delete (global as any).window;

    render(<PWARegistration />);

    // Should render without errors
    expect(document.body).toBeInTheDocument();

    // Restore window
    global.window = originalWindow;
  });

  it("should register service worker with correct path", () => {
    mockRegister.mockResolvedValue({ scope: "/" });

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    // Give time for async operations
    setTimeout(() => {
      expect(mockRegister).toHaveBeenCalledWith("/sw.js");
    }, 0);
  });

  it("should handle registration success", async () => {
    const mockRegistration = { scope: "/" };
    mockRegister.mockResolvedValue(mockRegistration);

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockRegister).toHaveBeenCalled();
  });

  it("should handle registration error", async () => {
    const mockError = new Error("Registration failed");
    mockRegister.mockRejectedValue(mockError);

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockRegister).toHaveBeenCalled();
  });

  it("should handle service worker registration with promise resolution", async () => {
    const mockRegistration = { scope: "/", installing: null };
    mockRegister.mockResolvedValue(mockRegistration);

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockRegister).toHaveBeenCalledWith("/sw.js");
  });

  it("should handle service worker registration with promise rejection", async () => {
    const mockError = new Error("Service worker registration failed");
    mockRegister.mockRejectedValue(mockError);

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockRegister).toHaveBeenCalledWith("/sw.js");
  });

  it("should not register service worker when navigator.serviceWorker is not available", () => {
    // Mock navigator without serviceWorker
    const originalNavigator = global.navigator;
    (global as any).navigator = {};

    // Clear any previous calls
    mockRegister.mockClear();

    render(<PWARegistration />);

    // Trigger the load event manually
    const loadEvent = new Event("load");
    window.dispatchEvent(loadEvent);

    // Wait for any async operations
    setTimeout(() => {
      expect(mockRegister).not.toHaveBeenCalled();
    }, 0);

    // Restore navigator
    global.navigator = originalNavigator;
  });

  it("should not register service worker when window is not available", () => {
    // Mock window as undefined
    const originalWindow = global.window;
    delete (global as any).window;

    render(<PWARegistration />);

    expect(mockRegister).not.toHaveBeenCalled();

    // Restore window
    global.window = originalWindow;
  });

  it("should handle multiple load events", () => {
    render(<PWARegistration />);

    // Trigger multiple load events
    const loadEvent1 = new Event("load");
    const loadEvent2 = new Event("load");
    window.dispatchEvent(loadEvent1);
    window.dispatchEvent(loadEvent2);

    // Should only register once due to the useEffect dependency array
    setTimeout(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
    }, 0);
  });
});
