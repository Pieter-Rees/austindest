export interface Gig {
  date: string;
  name: string;
  location: string;
  info?: string;
  link?: string;
}

export interface SocialLinks {
  soundcloud: string;
  instagram: string;
  facebook: string;
  spotify: string;
  email: string;
  instagramHandle: string;
}

export interface SpotifyEmbeds {
  artist: string;
  track1: string;
  track2: string;
}

export interface BioImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionHeaderProps {
  subTitle: string;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  margin?: boolean;
  title?: string;
  smallTitle?: string;
  centerText?: boolean;
}

export interface EmbedContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export interface LoadingWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export interface ImageGridProps {
  images: BioImage[];
  className?: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface LazyIframeProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
}
