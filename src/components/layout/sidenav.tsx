import { Link } from 'react-scroll';
import Socials from '../features/socials';

interface SidenavProps {
  handleToggle: () => void;
  showSideNav: boolean;
}

export default function Sidenav({ handleToggle, showSideNav }: SidenavProps) {
  return (
    <>
      {showSideNav && (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden' />
      )}

      <nav
        className={`block lg:hidden transition-all fixed left-0 top-0 h-full w-full overflow-hidden bg-black/80 backdrop-blur-xl border-r border-white/10 transform-gpu z-50 ${
          showSideNav ? '' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col justify-center items-center h-full'>
          <div className='flex flex-col justify-center items-center uppercase gap-8'>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='landing'
              spy={true}
              smooth={true}
              offset={-300}
              className='text-3xl text-center cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Home</span>
            </Link>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='gigs'
              spy={true}
              smooth={true}
              offset={-150}
              className='text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Gigs</span>
            </Link>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='bio'
              spy={true}
              smooth={true}
              offset={-150}
              className='text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Bio</span>
            </Link>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='listen'
              spy={true}
              offset={-150}
              smooth={true}
              className='text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Listen</span>
            </Link>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='watch'
              spy={true}
              smooth={true}
              offset={-150}
              className='text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Watch</span>
            </Link>
            <Link
              activeClass='text-bubblegum hover:cursor-default'
              to='contact'
              spy={true}
              offset={-300}
              smooth={true}
              className='text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
              duration={500}
            >
              <span onClick={handleToggle}>Contact</span>
            </Link>
          </div>
          <div className='mt-12'>
            <Socials />
          </div>
        </div>
      </nav>
    </>
  );
}
