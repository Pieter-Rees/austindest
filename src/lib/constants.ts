import { NavItem, SocialLink } from '@/types';

export const SITE_NAME = 'Press Kit AD';
export const SITE_DESCRIPTION = 'Your band press kit and promotional website';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Bio', href: '/#bio' },
  { label: 'Music', href: '/#listen' },
  { label: 'Videos', href: '/#watch' },
  { label: 'Gigs', href: '/#gigs' },
  { label: 'Contact', href: '/#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'Spotify',
    url: 'https://open.spotify.com/artist/your-artist-id',
    icon: 'spotify',
  },
  {
    platform: 'YouTube',
    url: 'https://youtube.com/@your-channel',
    icon: 'youtube',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/your-handle',
    icon: 'instagram',
  },
];

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;
