export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Gig {
  date: string;
  venue: string;
  location: string;
  ticketUrl?: string;
}

export interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

export interface BioSection {
  title: string;
  content: string;
  image?: string;
} 