import { renderHook, act } from '@testing-library/react';
import {
  useDebounce,
  useDebouncedCallback,
  useThrottle,
} from '@/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    );

    expect(result.current).toBe('initial');

    // Update value
    rerender({ value: 'updated', delay: 100 });
    expect(result.current).toBe('initial'); // Should not update immediately

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('updated');
  });

  it('resets timer on value change', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 100 } }
    );

    // Update value multiple times
    rerender({ value: 'first', delay: 100 });
    rerender({ value: 'second', delay: 100 });
    rerender({ value: 'third', delay: 100 });

    // Fast forward less than delay
    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current).toBe('initial');

    // Fast forward remaining time
    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current).toBe('third');
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces callback execution', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));

    // Call multiple times
    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    expect(callback).not.toHaveBeenCalled();

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3');
  });

  it('cancels previous calls', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));

    act(() => {
      result.current('first');
    });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    act(() => {
      result.current('second');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });
});

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('throttles callback execution', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));

    // Call multiple times within throttle period
    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1');

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current('arg4');
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('arg4');
  });
});
