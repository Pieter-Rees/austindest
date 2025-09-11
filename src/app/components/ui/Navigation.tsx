"use client";

import { useState, useEffect } from 'react';
import { Link, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Logo } from './Logo';

export interface NavigationProps {
  className?: string;
}

const navItems = [
  { to: 'landing', label: 'Home' },
  { to: 'gigs', label: 'Gigs' },
  { to: 'bio', label: 'Bio' },
  { to: 'listen', label: 'Listen' },
  { to: 'watch', label: 'Watch' },
  { to: 'contact', label: 'Contact' }
];

export const Navigation = ({ className }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleSetActive = (to: string) => {
    setIsScrolled(to !== 'landing');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="cursor-pointer transition-all duration-300 hover:scale-105"
              aria-label="Scroll to top"
            >
              <Logo />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                activeClass="text-bubblegum"
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={handleSetActive}
                className="text-lg 2xl:text-2xl cursor-pointer transition-colors duration-300 hover:text-bubblegum"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={cn(
                  'w-6 h-6 transition-transform duration-300',
                  isMobileMenuOpen && 'rotate-90'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                activeClass="text-bubblegum"
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={handleSetActive}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg cursor-pointer transition-colors duration-300 hover:text-bubblegum"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 