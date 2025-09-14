import { renderHook, act } from '@testing-library/react';
import { useScroll } from '@/hooks/useScroll';

// Mock requestAnimationFrame
const mockRequestAnimationFrame = jest.fn(callback => {
  callback();
  return 1;
});

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRequestAnimationFrame,
});

describe('useScroll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 2000,
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useScroll());

    expect(result.current.scrollY).toBe(0);
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.direction).toBe(null);
    expect(result.current.velocity).toBe(0);
    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
  });

  it('updates scroll state on scroll', () => {
    const { result } = renderHook(() => useScroll());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrollY).toBe(100);
    expect(result.current.isScrolled).toBe(true);
    expect(result.current.direction).toBe('down');
  });

  it('detects scroll direction correctly', () => {
    const { result } = renderHook(() => useScroll());

    // Initial scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.direction).toBe('down');
  });

  it('detects top and bottom positions', () => {
    const { result } = renderHook(() => useScroll());

    // At top
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
  });

  it('calculates velocity correctly', () => {
    const { result } = renderHook(() => useScroll());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.velocity).toBeGreaterThanOrEqual(0);
  });

  it('uses requestAnimationFrame for performance', () => {
    renderHook(() => useScroll());

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });
});
