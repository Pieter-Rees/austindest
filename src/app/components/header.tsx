"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "./logo";
import localFont from "next/font/local";
import "./neon.css";
const myFont = localFont({
  src: "../../../public/fonts/Monoton-Regular.woff2",
});
import { Link, animateScroll as scroll } from "react-scroll";
import Sidenav from "./sidenav";
export default function Header() {
  const [showSideNav, setShowSideNav] = useState(false);

  const handleToggle = () => {
    setShowSideNav((showSideNav) => !showSideNav);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <nav className="px-4 fixed z-2 top-0 w-full flex items-center justify-between flex-wrap bg-black/90 backdrop-blur-md">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div
            onClick={() => scrollToTop()}
            className="cursor-pointer p-4 transition-all fill-white hover:fill-bubblegum ease-in-out"
          >
            <Logo />
          </div>
        </div>
        <div className="md:hidden">
          <button
            title="Menu"
            onClick={handleToggle}
            className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white"
          >
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
        <div className="hidden md:flex w-full justify-end flex-grow md:items-center md:w-auto text-sm md:flex-grow uppercase">
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="landing"
            spy={true}
            smooth={true}
            offset={-300}
            className="text-lg cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Home
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="gigs"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-lg cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Gigs
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="bio"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-lg cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Bio
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="listen"
            spy={true}
            offset={-150}
            smooth={true}
            className="text-lg cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Listen
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="watch"
            spy={true}
            smooth={true}
            offset={-150}
            className="text-lg cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Watch
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="contact"
            spy={true}
            offset={-300}
            smooth={true}
            className="text-lg cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Contact
          </Link>
        </div>
      </nav>
      <Sidenav showSideNav={showSideNav} handleToggle={handleToggle} />
    </>
  );
}
