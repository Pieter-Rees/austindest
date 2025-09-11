import { act, renderHook } from "@testing-library/react";

import { useAppStore } from "../store";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useAppStore", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  it("should have correct initial state", () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.showSideNav).toBe(false);
    expect(result.current.navBackground).toBe(false);
    expect(result.current.activeSection).toBe("landing");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.theme).toBe("system");
  });

  it("should update showSideNav", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setShowSideNav(true);
    });

    expect(result.current.showSideNav).toBe(true);
  });

  it("should toggle showSideNav", () => {
    const { result } = renderHook(() => useAppStore());

    // Reset store to ensure clean state
    act(() => {
      result.current.reset();
    });

    act(() => {
      result.current.toggleSideNav();
    });

    expect(result.current.showSideNav).toBe(true);

    act(() => {
      result.current.toggleSideNav();
    });

    expect(result.current.showSideNav).toBe(false);
  });

  it("should update navBackground", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setNavBackground(true);
    });

    expect(result.current.navBackground).toBe(true);
  });

  it("should update activeSection", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setActiveSection("bio");
    });

    expect(result.current.activeSection).toBe("bio");
  });

  it("should update isLoading", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should update theme", () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
  });

  it("should reset to initial state", () => {
    const { result } = renderHook(() => useAppStore());

    // Modify state
    act(() => {
      result.current.setShowSideNav(true);
      result.current.setNavBackground(true);
      result.current.setActiveSection("bio");
      result.current.setLoading(true);
      result.current.setTheme("dark");
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.showSideNav).toBe(false);
    expect(result.current.navBackground).toBe(false);
    expect(result.current.activeSection).toBe("landing");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.theme).toBe("system");
  });

  it("should handle all theme values", () => {
    const { result } = renderHook(() => useAppStore());

    const themes = ["light", "dark", "system"] as const;

    themes.forEach(theme => {
      act(() => {
        result.current.setTheme(theme);
      });

      expect(result.current.theme).toBe(theme);
    });
  });
});
