import '@/styles/neon.css';
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../../../public/fonts/Monoton-Regular.woff2',
});

interface TitleProps {
  title?: string;
  subTitle?: string;
  left?: boolean;
  right?: boolean;
  smallTitle?: string;
  center?: boolean;
  margin?: boolean;
}

export const Title = ({
  title,
  subTitle,
  left = false,
  right = false,
  smallTitle,
  center = false,
  margin = false,
}: TitleProps) => {
  const titleClasses = [
    'text-7xl sm:text-8xl lg:text-9xl text-disco-ball text-neon-title',
    center && 'text-center lg:text-left',
  ]
    .filter(Boolean)
    .join(' ');

  const subTitleClasses = [
    'text-4xl sm:text-5xl lg:text-6xl text-white text-neon-disco',
    margin && 'mt-8',
    left && 'text-center lg:text-left',
    right && 'text-center lg:text-right',
    center && 'text-center',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className='w-full'>
      <div className={myFont.className}>
        {title && <h1 className={titleClasses}>{title}</h1>}
        {subTitle && <h2 className={subTitleClasses}>{subTitle}</h2>}
        {smallTitle && (
          <h3 className='text-lg lg:text-3xl text-white'>{smallTitle}</h3>
        )}
      </div>
    </div>
  );
};
