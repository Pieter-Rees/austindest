import { useDeepMemo, useStableCallback, useStableMemo } from '@/hooks/useMemo';
import { act, renderHook } from '@testing-library/react';

describe('useStableMemo', () => {
  it('returns the result of factory function', () => {
    const factory = jest.fn(() => 'test value');
    const { result } = renderHook(() => useStableMemo(factory, []));

    expect(result.current).toBe('test value');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('calls factory only when deps change', () => {
    const factory = jest.fn(() => Math.random());
    const { result, rerender } = renderHook(
      ({ deps }) => useStableMemo(factory, deps),
      { initialProps: { deps: [1, 2] } }
    );

    const firstValue = result.current;
    expect(factory).toHaveBeenCalledTimes(1);

    // Same deps - should not call factory
    rerender({ deps: [1, 2] });
    expect(result.current).toBe(firstValue);
    expect(factory).toHaveBeenCalledTimes(1);

    // Different deps - should call factory
    rerender({ deps: [1, 3] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles empty dependency array', () => {
    const factory = jest.fn(() => 'constant');
    const { result, rerender } = renderHook(() => useStableMemo(factory, []));

    expect(result.current).toBe('constant');
    expect(factory).toHaveBeenCalledTimes(1);

    // Should not call factory again
    rerender();
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('handles undefined dependencies', () => {
    const factory = jest.fn(() => 'test');
    const { result } = renderHook(() => useStableMemo(factory, [undefined, null]));

    expect(result.current).toBe('test');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('handles object dependencies with same reference', () => {
    const obj = { a: 1, b: 2 };
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useStableMemo(factory, deps),
      { initialProps: { deps: [obj] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same object reference - should not call factory
    rerender({ deps: [obj] });
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('handles object dependencies with different reference but same content', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useStableMemo(factory, deps),
      { initialProps: { deps: [{ a: 1, b: 2 }] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Different object reference but same content - should call factory
    rerender({ deps: [{ a: 1, b: 2 }] });
    expect(factory).toHaveBeenCalledTimes(2);
  });
});

describe('useStableCallback', () => {
  it('returns a stable callback reference', () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(() => useStableCallback(callback));

    const firstCallback = result.current;
    expect(typeof firstCallback).toBe('function');

    // Re-render with different callback
    const newCallback = jest.fn();
    rerender();
    const { result: newResult } = renderHook(() => useStableCallback(newCallback));

    // Should return the same function reference
    expect(newResult.current).toBe(firstCallback);
  });

  it('calls the latest callback function', () => {
    let callback = jest.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useStableCallback(cb),
      { initialProps: { cb: callback } }
    );

    act(() => {
      result.current('test');
    });

    expect(callback).toHaveBeenCalledWith('test');

    // Update callback
    callback = jest.fn();
    rerender({ cb: callback });

    act(() => {
      result.current('updated');
    });

    expect(callback).toHaveBeenCalledWith('updated');
  });

  it('handles callback with multiple arguments', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useStableCallback(callback));

    act(() => {
      result.current('arg1', 'arg2', 'arg3');
    });

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('handles callback that returns values', () => {
    const callback = jest.fn(() => 'return value');
    const { result } = renderHook(() => useStableCallback(callback));

    let returnValue: string;
    act(() => {
      returnValue = result.current();
    });

    expect(returnValue!).toBe('return value');
  });
});

describe('useDeepMemo', () => {
  it('returns the result of factory function', () => {
    const factory = jest.fn(() => 'test value');
    const { result } = renderHook(() => useDeepMemo(factory, []));

    expect(result.current).toBe('test value');
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it('calls factory only when deps change deeply', () => {
    const factory = jest.fn(() => Math.random());
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [{ a: 1, b: 2 }] } }
    );

    const firstValue = result.current;
    expect(factory).toHaveBeenCalledTimes(1);

    // Same object content - should not call factory
    rerender({ deps: [{ a: 1, b: 2 }] });
    expect(result.current).toBe(firstValue);
    expect(factory).toHaveBeenCalledTimes(1);

    // Different object content - should call factory
    rerender({ deps: [{ a: 1, b: 3 }] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles nested objects', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [{ a: { b: { c: 1 } } }] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same nested structure - should not call factory
    rerender({ deps: [{ a: { b: { c: 1 } } }] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different nested structure - should call factory
    rerender({ deps: [{ a: { b: { c: 2 } } }] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles arrays', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [[1, 2, 3]] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same array content - should not call factory
    rerender({ deps: [[1, 2, 3]] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different array content - should call factory
    rerender({ deps: [[1, 2, 4]] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles mixed types in dependencies', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [1, 'string', { a: 1 }, [1, 2]] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same mixed content - should not call factory
    rerender({ deps: [1, 'string', { a: 1 }, [1, 2]] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different content - should call factory
    rerender({ deps: [1, 'string', { a: 2 }, [1, 2]] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles null and undefined values', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [null, undefined] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same null/undefined - should not call factory
    rerender({ deps: [null, undefined] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different null/undefined - should call factory
    rerender({ deps: [undefined, null] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles primitive values', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [1, 'string', true] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same primitives - should not call factory
    rerender({ deps: [1, 'string', true] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different primitives - should call factory
    rerender({ deps: [1, 'string', false] });
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it('handles empty objects and arrays', () => {
    const factory = jest.fn(() => 'test');
    const { result, rerender } = renderHook(
      ({ deps }) => useDeepMemo(factory, deps),
      { initialProps: { deps: [{}, []] } }
    );

    expect(factory).toHaveBeenCalledTimes(1);

    // Same empty structures - should not call factory
    rerender({ deps: [{}, []] });
    expect(factory).toHaveBeenCalledTimes(1);

    // Different empty structures - should call factory
    rerender({ deps: [{ a: 1 }, []] });
    expect(factory).toHaveBeenCalledTimes(2);
  });
});
