'use client';
import { useMemo, useRef, useCallback } from 'react';

export function useStableMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T } | undefined>(
    undefined
  );

  return useMemo(() => {
    if (!ref.current || !areEqual(ref.current.deps, deps)) {
      ref.current = { deps, value: factory() };
    }
    return ref.current.value;
  }, [factory, deps]);
}

export function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T
): T {
  const ref = useRef<T>(callback);
  ref.current = callback;

  return useCallback(((...args: any[]) => ref.current(...args)) as T, []);
}

export function useDeepMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T } | undefined>(
    undefined
  );

  return useMemo(() => {
    if (!ref.current || !areDeepEqual(ref.current.deps, deps)) {
      ref.current = { deps, value: factory() };
    }
    return ref.current.value;
  }, [factory, deps]);
}

function areEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => Object.is(val, b[index]));
}

function areDeepEqual(
  a: React.DependencyList,
  b: React.DependencyList
): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => deepEqual(val, b[index]));
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(key =>
    deepEqual(
      (a as Record<string, unknown>)[key],
      (b as Record<string, unknown>)[key]
    )
  );
}
