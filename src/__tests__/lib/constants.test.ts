import { SOCIAL_LINKS, GIGS, SPOTIFY_EMBEDS, SOUNDCLOUD_EMBED, YOUTUBE_VIDEO, BACKGROUND_VIDEO, BIO_IMAGES, NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';

describe('Constants', () => {
  describe('SOCIAL_LINKS', () => {
    it('has all required social links', () => {
      expect(SOCIAL_LINKS).toHaveProperty('soundcloud');
      expect(SOCIAL_LINKS).toHaveProperty('instagram');
      expect(SOCIAL_LINKS).toHaveProperty('facebook');
      expect(SOCIAL_LINKS).toHaveProperty('spotify');
      expect(SOCIAL_LINKS).toHaveProperty('email');
      expect(SOCIAL_LINKS).toHaveProperty('instagramHandle');
    });

    it('has valid URLs for social links', () => {
      expect(SOCIAL_LINKS.soundcloud).toMatch(/^https:\/\//);
      expect(SOCIAL_LINKS.instagram).toMatch(/^https:\/\//);
      expect(SOCIAL_LINKS.facebook).toMatch(/^https:\/\//);
      expect(SOCIAL_LINKS.spotify).toMatch(/^https:\/\//);
    });

    it('has valid email format', () => {
      expect(SOCIAL_LINKS.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe('GIGS', () => {
    it('is an array', () => {
      expect(Array.isArray(GIGS)).toBe(true);
    });

    it('has gigs with required properties', () => {
      GIGS.forEach(gig => {
        expect(gig).toHaveProperty('date');
        expect(gig).toHaveProperty('name');
        expect(gig).toHaveProperty('location');
        expect(typeof gig.date).toBe('string');
        expect(typeof gig.name).toBe('string');
        expect(typeof gig.location).toBe('string');
      });
    });

    it('has valid date format', () => {
      GIGS.forEach(gig => {
        expect(gig.date).toMatch(/^\d{2}•\d{2}•\d{4}$/);
      });
    });
  });

  describe('SPOTIFY_EMBEDS', () => {
    it('has all required embed URLs', () => {
      expect(SPOTIFY_EMBEDS).toHaveProperty('artist');
      expect(SPOTIFY_EMBEDS).toHaveProperty('track1');
      expect(SPOTIFY_EMBEDS).toHaveProperty('track2');
    });

    it('has valid Spotify embed URLs', () => {
      Object.values(SPOTIFY_EMBEDS).forEach(url => {
        expect(url).toMatch(/^https:\/\/open\.spotify\.com\/embed\//);
      });
    });
  });

  describe('SOUNDCLOUD_EMBED', () => {
    it('is a valid SoundCloud embed URL', () => {
      expect(SOUNDCLOUD_EMBED).toMatch(/^https:\/\/w\.soundcloud\.com\/player\//);
    });
  });

  describe('YOUTUBE_VIDEO', () => {
    it('is a valid YouTube URL', () => {
      expect(YOUTUBE_VIDEO).toMatch(/^https:\/\/youtu\.be\//);
    });
  });

  describe('BACKGROUND_VIDEO', () => {
    it('is a valid YouTube URL', () => {
      expect(BACKGROUND_VIDEO).toMatch(/^https:\/\/youtu\.be\//);
    });
  });

  describe('BIO_IMAGES', () => {
    it('is an array of image objects', () => {
      expect(Array.isArray(BIO_IMAGES)).toBe(true);
      BIO_IMAGES.forEach(image => {
        expect(image).toHaveProperty('src');
        expect(image).toHaveProperty('alt');
        expect(typeof image.src).toBe('string');
        expect(typeof image.alt).toBe('string');
      });
    });

    it('has valid image paths', () => {
      BIO_IMAGES.forEach(image => {
        expect(image.src).toMatch(/^\/images\//);
      });
    });
  });

  describe('NAVIGATION_ITEMS', () => {
    it('is an array of navigation items', () => {
      expect(Array.isArray(NAVIGATION_ITEMS)).toBe(true);
      NAVIGATION_ITEMS.forEach(item => {
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('href');
        expect(typeof item.name).toBe('string');
        expect(typeof item.href).toBe('string');
      });
    });

    it('has valid href format', () => {
      NAVIGATION_ITEMS.forEach(item => {
        expect(item.href).toMatch(/^#/);
      });
    });
  });

  describe('SITE_CONFIG', () => {
    it('has all required properties', () => {
      expect(SITE_CONFIG).toHaveProperty('name');
      expect(SITE_CONFIG).toHaveProperty('description');
      expect(SITE_CONFIG).toHaveProperty('url');
      expect(SITE_CONFIG).toHaveProperty('ogImage');
      expect(SITE_CONFIG).toHaveProperty('keywords');
      expect(SITE_CONFIG).toHaveProperty('creator');
      expect(SITE_CONFIG).toHaveProperty('themeColor');
    });

    it('has valid URL format', () => {
      expect(SITE_CONFIG.url).toMatch(/^https:\/\//);
    });

    it('has valid theme color format', () => {
      expect(SITE_CONFIG.themeColor).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('has keywords as array', () => {
      expect(Array.isArray(SITE_CONFIG.keywords)).toBe(true);
      SITE_CONFIG.keywords.forEach(keyword => {
        expect(typeof keyword).toBe('string');
      });
    });
  });
});
