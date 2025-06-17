import { SectionProps } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';

export const Section = ({ id, title, children, className = '' }: SectionProps) => {
  const { animationClass } = useAnimation({ type: 'fade-in' });

  return (
    <section
      id={id}
      className={`min-h-screen py-16 px-4 ${className} ${animationClass}`}
    >
      <div className="container mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}; 