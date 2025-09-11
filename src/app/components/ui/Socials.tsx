import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { SocialIcon } from './SocialIcon';

export interface SocialsProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'vertical';
  animated?: boolean;
}

const socialLinks = [
  {
    platform: 'soundcloud' as const,
    href: 'https://soundcloud.com/austin_dest',
    label: 'SoundCloud'
  },
  {
    platform: 'instagram' as const,
    href: 'https://www.instagram.com/austindestmusic/',
    label: 'Instagram'
  },
  {
    platform: 'facebook' as const,
    href: 'https://www.facebook.com/austindest_music',
    label: 'Facebook'
  }
];

const Socials = forwardRef<HTMLDivElement, SocialsProps>(
  ({ 
    className, 
    size = 'md',
    layout = 'horizontal',
    animated = true,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-4',
          layout === 'vertical' ? 'flex-col' : 'flex-row',
          className
        )}
        {...props}
      >
        {socialLinks.map((social) => (
          <SocialIcon
            key={social.platform}
            platform={social.platform}
            href={social.href}
            size={size}
            animated={animated}
            aria-label={social.label}
          />
        ))}
      </div>
    );
  }
);

Socials.displayName = 'Socials';

export { Socials }; 