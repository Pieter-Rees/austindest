import * as Hooks from '@/hooks';

describe('Hooks Index', () => {
  it('exports all hooks', () => {
    expect(Hooks.useLoading).toBeDefined();
    expect(Hooks.useScroll).toBeDefined();
    expect(Hooks.useIntersectionObserver).toBeDefined();
  });

  it('exports are functions', () => {
    expect(typeof Hooks.useLoading).toBe('function');
    expect(typeof Hooks.useScroll).toBe('function');
    expect(typeof Hooks.useIntersectionObserver).toBe('function');
  });
});
