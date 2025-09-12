import type { ReactElement } from 'react';

interface SectionProps {
  fullVh?: boolean;
  bg?: boolean;
  children: ReactElement;
  id?: string;
}

export const Section = ({
  children,
  fullVh = false,
  bg = false,
  id,
}: SectionProps) => {
  const sectionClasses = [
    'w-full flex justify-center items-center relative z-2',
    bg && 'bg-gradient-to-b from-bubblegum/20 to-blue/20 backdrop-blur-md',
    fullVh && 'h-screen',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className='w-full lg:mx-24 xl:mx-48 p-4 md:p-8 lg:p-16 m-8 lg:my-16'>
        {children}
      </div>
    </section>
  );
};
