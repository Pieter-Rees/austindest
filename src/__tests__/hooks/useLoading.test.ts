import { renderHook, act } from '@testing-library/react';
import { useLoading } from '@/hooks/useLoading';

describe('useLoading', () => {
  it('initializes with default false state', () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.isLoading).toBe(false);
  });

  it('initializes with custom initial state', () => {
    const { result } = renderHook(() => useLoading(true));
    expect(result.current.isLoading).toBe(true);
  });

  it('provides startLoading function', () => {
    const { result } = renderHook(() => useLoading());
    expect(typeof result.current.startLoading).toBe('function');
  });

  it('provides stopLoading function', () => {
    const { result } = renderHook(() => useLoading());
    expect(typeof result.current.stopLoading).toBe('function');
  });

  it('sets loading to true when startLoading is called', () => {
    const { result } = renderHook(() => useLoading(false));
    
    act(() => {
      result.current.startLoading();
    });
    expect(result.current.isLoading).toBe(true);
  });

  it('sets loading to false when stopLoading is called', () => {
    const { result } = renderHook(() => useLoading(true));
    
    act(() => {
      result.current.stopLoading();
    });
    expect(result.current.isLoading).toBe(false);
  });
});