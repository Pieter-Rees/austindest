import { SOCIAL_LINKS } from '@/lib/constants';
import { useAnimation } from '@/hooks/useAnimation';

export const SocialLinks = () => {
  const { animationClass } = useAnimation({ type: 'fade-in', delay: 'slow' });

  return (
    <div className={`flex justify-center space-x-6 ${animationClass}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary-400 transition-colors"
          aria-label={`Visit our ${social.platform} page`}
        >
          <span className="sr-only">{social.platform}</span>
          <i className={`fab fa-${social.icon} text-2xl`} />
        </a>
      ))}
    </div>
  );
}; 