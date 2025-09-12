'use client';
import { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import Logo from '../ui/logo';
import Sidenav from './sidenav';
import '@/styles/neon.css';

export default function Header() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [navBackground, setNavBackground] = useState(false);

  const handleToggle = () => setShowSideNav(prev => !prev);
  const scrollToTop = () => scroll.scrollToTop();
  const handleSetActive = (to: string) => setNavBackground(to !== 'landing');

  useEffect(() => {
    document.body.style.overflow = showSideNav ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSideNav]);

  return (
    <>
      <nav
        className={`px-4 fixed z-50 top-0 w-full flex items-center justify-between transition-all duration-300 ${
          navBackground
            ? 'bg-black/20 backdrop-blur-lg border-b border-white/10 shadow-lg'
            : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <div
            onClick={() => scrollToTop()}
            className='cursor-pointer m-4 transition-all fill-white hover:fill-bubblegum ease-in-out'
          >
            <Logo />
          </div>
        </div>
        <div className='md:hidden'>
          <button
            title='Menu'
            onClick={handleToggle}
            className={`flex items-center px-3 py-2 transition-all ${
              showSideNav ? 'rotate-90' : ''
            }`}
          >
            <svg
              version='1.1'
              id='icon'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='30px'
              height='30px'
              viewBox='0 0 50 50'
            >
              <polygon
                style={{ fill: '#fff', stroke: 'none' }}
                points='40,25 10,45 10,5 40,25 '
                id='shape1'
              >
                <animate
                  id='animPauseOne'
                  begin='indefinite'
                  attributeName='points'
                  dur='500ms'
                  to='5,45 15,45 15,5 5,5 '
                  fill='freeze'
                />
                <animate
                  id='animPlayOne'
                  begin='indefinite'
                  attributeName='points'
                  dur='500ms'
                  to='40,25 10,45 10,5 40,25 '
                  fill='freeze'
                />
              </polygon>

              <polygon
                style={{ fill: '#fff', stroke: 'none' }}
                points='40,25 10,45 10,5 40,25 '
                id='shape2'
              >
                <animate
                  id='animPauseTwo'
                  begin='indefinite'
                  attributeName='points'
                  dur='500ms'
                  to='35,45 45,45 45,5 35,5 '
                  fill='freeze'
                />
                <animate
                  id='animPlayTwo'
                  begin='indefinite'
                  attributeName='points'
                  dur='500ms'
                  to='40,25 10,45 10,5 40,25 '
                  fill='freeze'
                />
              </polygon>
            </svg>
          </button>
        </div>
        <div className='hidden md:flex w-full justify-end flex-grow md:items-center md:w-auto md:flex-grow uppercase'>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='landing'
            spy={true}
            smooth={true}
            className='text-lg 2xl:text-2xl cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Home
          </Link>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='gigs'
            spy={true}
            smooth={true}
            className=' text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Gigs
          </Link>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='bio'
            spy={true}
            smooth={true}
            className='text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Bio
          </Link>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='listen'
            spy={true}
            smooth={true}
            className='text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Listen
          </Link>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='watch'
            spy={true}
            smooth={true}
            className='text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Watch
          </Link>
          <Link
            activeClass='text-bubblegum hover:cursor-default'
            to='contact'
            spy={true}
            smooth={true}
            className='text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4'
            duration={500}
            onSetActive={handleSetActive}
          >
            Contact
          </Link>
        </div>
      </nav>
      <Sidenav showSideNav={showSideNav} handleToggle={handleToggle} />
    </>
  );
}
