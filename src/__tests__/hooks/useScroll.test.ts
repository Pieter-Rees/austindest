import { renderHook, act } from '@testing-library/react';
import { useScroll } from '@/hooks/useScroll';

describe('useScroll', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.scrollY).toBe(0);
  });

  it('detects scroll when past threshold', () => {
    const { result, rerender } = renderHook(() => useScroll());

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 60,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    rerender();

    expect(result.current.isScrolled).toBe(true);
    expect(result.current.scrollY).toBe(60);
  });

  it('does not detect scroll when below threshold', () => {
    const { result, rerender } = renderHook(() => useScroll());

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 30,
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    rerender();

    expect(result.current.isScrolled).toBe(false);
    expect(result.current.scrollY).toBe(30);
  });

  it('resets when scroll returns to top', () => {
    const { result, rerender } = renderHook(() => useScroll());

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 60,
    });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    rerender();
    expect(result.current.isScrolled).toBe(true);

    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 30,
    });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
    rerender();
    expect(result.current.isScrolled).toBe(false);
  });
});
