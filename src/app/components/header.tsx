"use client";
import Image from "next/image";
import localFont from "next/font/local";
import "./neon.css";
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

interface HeaderProps {
  scrollTo: Function;
}

export default function Header(props: HeaderProps) {
  return (
    <nav className="fixed z-2 top-0 w-full flex items-center justify-between flex-wrap bg-black/80 backdrop-blur-md">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image
          src="/logo.png"
          alt="Picture of the author"
          width={60}
          height={60}
        />
        <span className={myFont.className}>
          {/* <span className="font-semibold text-xl tracking-tight">Austin</span> */}
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full flex justify-end flex-grow lg:flex lg:items-center lg:w-auto text-sm lg:flex-grow">
        <Link
          activeClass="text-bubble-gum"
          to="landing"
          spy={true}
          smooth={true}
          offset={-300}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Home
        </Link>
        <Link
          activeClass="text-bubble-gum"
          to="gigs"
          spy={true}
          smooth={true}
          offset={-300}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Gigs
        </Link>
        <Link
          activeClass="text-bubble-gum"
          to="bio"
          spy={true}
          smooth={true}
          offset={-300}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Bio
        </Link>
        <Link
          activeClass="text-bubble-gum"
          to="listen"
          spy={true}
          offset={-300}
          smooth={true}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Listen
        </Link>
        <Link
          activeClass="text-bubble-gum"
          to="watch"
          spy={true}
          smooth={true}
          offset={-300}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Watch
        </Link>
        <Link
          activeClass="text-bubble-gum"
          to="contact"
          spy={true}
          offset={-300}
          smooth={true}
          className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 hover:text-bubble-gum mr-4"
          duration={500}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
