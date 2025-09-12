export const SOCIAL_LINKS = {
  soundcloud: 'https://soundcloud.com/austin_dest',
  instagram: 'https://www.instagram.com/austindestmusic/',
  facebook: 'https://www.facebook.com/austindest_music',
  spotify:
    'https://open.spotify.com/artist/6929wCqfP5hZJAwC3KWE8s?go=1&sp_cid=b30d4cf76015532c872be09c115a6615&nd=1',
  email: 'contact@austindest.com',
  instagramHandle: '@austindestmusic',
} as const;

export const GIGS = [
  {
    date: '06•04•2024',
    name: '30 Love',
    location: 'Rotterdam',
  },
  {
    date: '25•05•2024',
    name: 'Play Festival',
    location: 'Leeuwarden',
  },
  {
    date: '13•04•2024',
    name: 'The Deep Club',
    location: 'Hoofddorp',
  },
  {
    date: '04•05•2024',
    name: 'Charlatan',
    location: 'Gent, BE',
  },
  {
    date: '29•06•2024',
    name: 'SAM Ibiza Radio',
    location: 'Waddinxveen',
  },
  {
    date: '13•07•2024',
    name: 'Jaydee Invites',
    location: 'Bergen (NH)',
  },
  {
    date: '31•08•2024',
    name: 'Hartstocht Festival',
    location: 'Elp',
  },
  {
    date: '07•09•2024',
    name: 'Spees Festival',
    location: 'Elp',
  },
  {
    date: '18•10•2024',
    name: 'ADE (TBA)',
    location: 'Amsterdam',
    info: 'https://www.amsterdam-dance-event.nl/',
    link: 'https://www.facebook.com/amsterdamdanceevent',
  },
];

export const SPOTIFY_EMBEDS = {
  artist:
    'https://open.spotify.com/embed/artist/4i1SjBqGZ4lVlEgMfpKVjb?utm_source=generator&theme=0',
  track1:
    'https://open.spotify.com/embed/track/6aV4L76qLqOXKWM2KDI1IU?utm_source=generator',
  track2:
    'https://open.spotify.com/embed/track/21RfPY7y0nx5B0KuZm3k77?utm_source=generator',
} as const;

export const SOUNDCLOUD_EMBED =
  'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1412583274&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true';

export const YOUTUBE_VIDEO = 'https://youtu.be/3DWK8802N00?t=2546';

export const BACKGROUND_VIDEO =
  'https://youtu.be/oB325uTDKIw?si=FbP7X-cNp9hmUk2M';

export const BIO_IMAGES = [
  { src: '/images/a1.webp', alt: 'Austin Dest performing' },
  { src: '/images/a2.webp', alt: 'Austin Dest in studio' },
  { src: '/images/a3.webp', alt: 'Austin Dest DJ set' },
  { src: '/images/a4.webp', alt: 'Austin Dest at event' },
] as const;

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '#landing' },
  { name: 'Gigs', href: '#gigs' },
  { name: 'Bio', href: '#bio' },
  { name: 'Listen', href: '#listen' },
  { name: 'Watch', href: '#watch' },
  { name: 'Contact', href: '#contact' },
] as const;

export const SITE_CONFIG = {
  name: 'Austin Dest',
  description: 'Austin Dest, DJ, Producer, and Musician',
  url: 'https://austindest.com',
  ogImage: '/images/og-image.jpg',
  keywords: [
    'Austin',
    'Austin Dest',
    'Dest',
    'DJ Austin',
    'DJ Austin Dest',
    'DJ',
    'JayDee',
    'Austin Martin',
    'House',
    'Progressive',
    'Groove',
    'ADE',
    'A.D.E.',
    'Amsterdam',
    'Amsterdam Dance Event',
    'Amsterdam Dance Event 2023',
    'Amsterdam Dance Event 2022',
  ] as string[],
  creator: 'Pieter Rees',
  themeColor: '#ff77e9',
} as const;
