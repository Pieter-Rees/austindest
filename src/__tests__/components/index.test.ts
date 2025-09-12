import React from 'react';

// Mock react-player to avoid ESM import issues
jest.mock('react-player', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'react-player-mock' }, 'React Player Mock'),
}));

import * as Components from '@/components';

describe('Components Index', () => {
  it('exports all UI components', () => {
    expect(Components.EmbedContainer).toBeDefined();
    expect(Components.ErrorBoundary).toBeDefined();
    expect(Components.ImageGrid).toBeDefined();
    expect(Components.LazyIframe).toBeDefined();
    expect(Components.LoadingWrapper).toBeDefined();
    expect(Components.OptimizedImage).toBeDefined();
    expect(Components.SectionHeader).toBeDefined();
    expect(Components.SocialLink).toBeDefined();
    expect(Components.Logo).toBeDefined();
    expect(Components.Title).toBeDefined();
  });

  it('exports all layout components', () => {
    expect(Components.Header).toBeDefined();
    expect(Components.Section).toBeDefined();
    expect(Components.Sidenav).toBeDefined();
    expect(Components.Copyright).toBeDefined();
  });

  it('exports all feature components', () => {
    expect(Components.Bio).toBeDefined();
    expect(Components.Contact).toBeDefined();
    expect(Components.Gigs).toBeDefined();
    expect(Components.Landing).toBeDefined();
    expect(Components.LandingBg).toBeDefined();
    expect(Components.Listen).toBeDefined();
    expect(Components.Socials).toBeDefined();
    expect(Components.Watch).toBeDefined();
  });

  it('exports are functions/components', () => {
    expect(typeof Components.EmbedContainer).toBe('function');
    expect(typeof Components.ErrorBoundary).toBe('function');
    expect(typeof Components.ImageGrid).toBe('function');
    expect(typeof Components.LazyIframe).toBe('function');
    expect(typeof Components.LoadingWrapper).toBe('function');
    expect(typeof Components.OptimizedImage).toBe('function');
    expect(typeof Components.SectionHeader).toBe('function');
    expect(typeof Components.SocialLink).toBe('function');
    expect(typeof Components.Logo).toBe('function');
    expect(typeof Components.Title).toBe('function');
    expect(typeof Components.Header).toBe('function');
    expect(typeof Components.Section).toBe('function');
    expect(typeof Components.Sidenav).toBe('function');
    expect(typeof Components.Copyright).toBe('function');
    expect(typeof Components.Bio).toBe('function');
    expect(typeof Components.Contact).toBe('function');
    expect(typeof Components.Gigs).toBe('function');
    expect(typeof Components.Landing).toBe('function');
    expect(typeof Components.LandingBg).toBe('function');
    expect(typeof Components.Listen).toBe('function');
    expect(typeof Components.Socials).toBe('function');
    expect(typeof Components.Watch).toBe('function');
  });
});
