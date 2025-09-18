'use client';
import { animateScroll as scroll } from 'react-scroll';
import Socials from '../features/Socials';
import Logo from '../ui/Logo';
export default function Copyright() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const year = new Date().getFullYear();

  return (
    <div className='relative z-3 grid lg:grid-cols-2 gap-4 p-8 bg-black/90 backdrop-blur-md'>
      <Socials />
      <div className='block lg:hidden'>
        <hr />
      </div>
      <div className='flex-col justify-center flex items-center'>
        <div
          className='cursor-pointer  transition-all fill-white hover:fill-bubblegum ease-in-out'
          onClick={() => scrollToTop()}
        >
          <Logo />
        </div>

        <div className='text-center 2xl:text-2xl mt-4 text-white '>
          Copyright © {year}
        </div>
        <div className='text-center 2xl:text-2xl text-white '>Austin Dest</div>
      </div>
    </div>
  );
}
