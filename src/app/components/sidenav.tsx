import { Link, animateScroll as scroll } from "react-scroll";
import Socials from "./socials";

interface sideNavProps {
  handleToggle: Function;
  showSideNav: boolean;
}

export default function Sidenav(props: sideNavProps) {
  return (
    <nav
      className={`block lg:hidden transition-all fixed left-0  top-0 h-full w-9/12 overflow-hidden  bg-black/90 backdrop-blur-md transform-gpu ${
        props.showSideNav ? "" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="flex flex-col justify-center w-full justify-end uppercase gap-4 lg:gap-8 mt-8">
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="landing"
            spy={true}
            smooth={true}
            offset={-300}
            className="text-3xl text-center cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Home</span>
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="gigs"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Gigs</span>
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="bio"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Bio</span>
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="listen"
            spy={true}
            offset={-150}
            smooth={true}
            className="text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Listen</span>
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="watch"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Watch</span>
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="contact"
            spy={true}
            offset={-300}
            smooth={true}
            className="text-3xl text-center cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Contact</span>
          </Link>
        </div>
        <div className="mt-24">
          <Socials />
        </div>
      </div>
    </nav>
  );
}
