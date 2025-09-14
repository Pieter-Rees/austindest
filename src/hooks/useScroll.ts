'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  direction: 'up' | 'down' | null;
  velocity: number;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScroll() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    direction: null,
    velocity: 0,
    isAtTop: true,
    isAtBottom: false,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const ticking = useRef(false);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTime.current;
    const scrollDelta = currentScrollY - lastScrollY.current;

    const velocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta : 0;
    const direction = scrollDelta > 0 ? 'down' : scrollDelta < 0 ? 'up' : null;

    const isAtTop = currentScrollY <= 0;
    const isAtBottom =
      currentScrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 1;

    setScrollState({
      scrollY: currentScrollY,
      isScrolled: currentScrollY > 50,
      direction,
      velocity,
      isAtTop,
      isAtBottom,
    });

    lastScrollY.current = currentScrollY;
    lastTime.current = currentTime;
    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  useEffect(() => {
    // Initial state
    updateScrollState();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updateScrollState]);

  return scrollState;
}
