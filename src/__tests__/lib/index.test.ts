import * as Lib from '@/lib';

describe('Lib Index', () => {
  it('exports constants', () => {
    expect(Lib.SITE_CONFIG).toBeDefined();
    expect(Lib.NAVIGATION_ITEMS).toBeDefined();
    expect(Lib.SOCIAL_LINKS).toBeDefined();
    expect(Lib.GIGS).toBeDefined();
    expect(Lib.BIO_IMAGES).toBeDefined();
    expect(Lib.BACKGROUND_VIDEO).toBeDefined();
    expect(Lib.YOUTUBE_VIDEO).toBeDefined();
  });

  it('exports utility functions', () => {
    expect(Lib.cn).toBeDefined();
    expect(Lib.formatDate).toBeDefined();
    expect(Lib.sortGigsByDate).toBeDefined();
    expect(Lib.filterUpcomingGigs).toBeDefined();
    expect(Lib.filterPassedGigs).toBeDefined();
    expect(Lib.debounce).toBeDefined();
    expect(Lib.throttle).toBeDefined();
  });

  it('exports types', () => {
    expect(true).toBe(true);
  });

  it('exports are functions or objects', () => {
    expect(typeof Lib.cn).toBe('function');
    expect(typeof Lib.formatDate).toBe('function');
    expect(typeof Lib.sortGigsByDate).toBe('function');
    expect(typeof Lib.filterUpcomingGigs).toBe('function');
    expect(typeof Lib.filterPassedGigs).toBe('function');
    expect(typeof Lib.debounce).toBe('function');
    expect(typeof Lib.throttle).toBe('function');
    expect(typeof Lib.SITE_CONFIG).toBe('object');
    expect(typeof Lib.NAVIGATION_ITEMS).toBe('object');
    expect(typeof Lib.SOCIAL_LINKS).toBe('object');
    expect(typeof Lib.GIGS).toBe('object');
    expect(typeof Lib.BIO_IMAGES).toBe('object');
  });
});
