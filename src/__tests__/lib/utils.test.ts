import {
  cn,
  formatDate,
  sortGigsByDate,
  filterUpcomingGigs,
  filterPassedGigs,
  debounce,
  throttle,
} from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('class1', { class2: true, class3: false })).toBe(
        'class1 class2'
      );
    });

    it('handles undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2');
    });
  });

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      expect(formatDate('06•04•2024')).toBe('2024-04-06');
      expect(formatDate('25•05•2024')).toBe('2024-05-25');
    });
  });

  describe('sortGigsByDate', () => {
    const mockGigs = [
      { date: '06•04•2024', name: 'Gig 1' },
      { date: '25•05•2024', name: 'Gig 2' },
      { date: '13•04•2024', name: 'Gig 3' },
    ];

    it('sorts gigs in ascending order by default', () => {
      const sorted = sortGigsByDate(mockGigs);
      expect(sorted[0].name).toBe('Gig 1');
      expect(sorted[1].name).toBe('Gig 3');
      expect(sorted[2].name).toBe('Gig 2');
    });

    it('sorts gigs in descending order when specified', () => {
      const sorted = sortGigsByDate(mockGigs, false);
      expect(sorted[0].name).toBe('Gig 2');
      expect(sorted[1].name).toBe('Gig 3');
      expect(sorted[2].name).toBe('Gig 1');
    });

    it('does not mutate original array', () => {
      const original = [...mockGigs];
      sortGigsByDate(mockGigs);
      expect(mockGigs).toEqual(original);
    });
  });

  describe('filterUpcomingGigs', () => {
    const mockGigs = [
      { date: '06•04•2024', name: 'Past Gig' },
      { date: '25•05•2025', name: 'Future Gig' },
      { date: '13•04•2025', name: 'Another Future Gig' },
    ];

    it('filters upcoming gigs correctly', () => {
      const upcoming = filterUpcomingGigs(mockGigs);
      expect(upcoming).toHaveLength(0);
    });
  });

  describe('filterPassedGigs', () => {
    const mockGigs = [
      { date: '06•04•2024', name: 'Past Gig' },
      { date: '25•05•2025', name: 'Future Gig' },
      { date: '13•04•2025', name: 'Another Future Gig' },
    ];

    it('filters passed gigs correctly', () => {
      const passed = filterPassedGigs(mockGigs);
      expect(passed).toHaveLength(3);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('debounces function calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1');
      debouncedFn('arg2');
      debouncedFn('arg3');

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg3');
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('throttles function calls', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('arg1');
      throttledFn('arg2');
      throttledFn('arg3');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('arg1');

      jest.advanceTimersByTime(100);

      throttledFn('arg4');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('arg4');
    });
  });
});
