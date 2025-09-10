import { Link, animateScroll as scroll } from 'react-scroll';
import Socials from './socials';

interface sideNavProps {
  handleToggle: Function;
  showSideNav: boolean;
}

const navItems = [
  { id: 'landing', label: 'Home', offset: -300 },
  { id: 'gigs', label: 'Gigs', offset: -150 },
  { id: 'bio', label: 'Bio', offset: -150 },
  { id: 'listen', label: 'Listen', offset: -150 },
  { id: 'watch', label: 'Watch', offset: -150 },
  { id: 'contact', label: 'Contact', offset: -300 },
];

export default function Sidenav(props: sideNavProps) {
  return (
    <nav
      className={`block lg:hidden transition-all fixed left-0  top-0 h-full w-9/12 overflow-hidden  bg-black/90 backdrop-blur-md transform-gpu ${
        props.showSideNav ? '' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="flex flex-col justify-center w-full justify-end uppercase gap-4 lg:gap-8 mt-8">
          {navItems.map(item => (
            <Link
              key={item.id}
              activeClass="text-bubblegum hover:cursor-default"
              to={item.id}
              spy={true}
              smooth={true}
              offset={item.offset}
              className="text-3xl text-center cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4"
              duration={500}
            >
              <span onClick={() => props.handleToggle()}>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-24">
          <Socials />
        </div>
      </div>
    </nav>
  );
}
