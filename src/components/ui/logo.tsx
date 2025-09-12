import localFont from 'next/font/local';
import '@/styles/neon.css';

const myFont = localFont({
  src: '../../../public/fonts/Monoton-Regular.woff2',
});

export default function Logo() {
  return (
    <div className={myFont.className}>
      <div className='relative hover:animate-spin-slow cursor-grab'>
        <span className='absolute z-2 left-0 text-5xl lg:text-5xl text-neon-title'>
          A
        </span>
        <span className='relative z-0 text-5xl lg:text-5xl text-shine'>A</span>
      </div>
    </div>
  );
}
