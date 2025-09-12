import type { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const SocialLink = ({
  href,
  children,
  className = 'text-lg lg:text-lg 2xl:text-2xl text-white md:hover:text-bubblegum',
  target = '_blank',
  rel = 'noreferrer noopener',
  ariaLabel,
}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};
