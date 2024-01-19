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
            className="cursor-pointer m-4 transition-all fill-white hover:fill-bubblegum ease-in-out"
          >
            <Logo />
          </div>
        </div>
        <div className="md:hidden">
          <button
            title="Menu"
            onClick={handleToggle}
            className={
              "flex items-center px-3 py-2 transition-all " +
              (showSideNav ? "rotate-90" : "")
            }
          >
            <svg
              version="1.1"
              id="icon"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30px"
              height="30px"
              viewBox="0 0 50 50"
            >
              <polygon
                style={{ fill: "#fff", stroke: "none" }}
                points="40,25 10,45 10,5 40,25 "
                id="shape1"
              >
                <animate
                  id="animPauseOne"
                  begin="indefinite"
                  attributeName="points"
                  dur="500ms"
                  to="5,45 15,45 15,5 5,5 "
                  fill="freeze"
                />
                <animate
                  id="animPlayOne"
                  begin="indefinite"
                  attributeName="points"
                  dur="500ms"
                  to="40,25 10,45 10,5 40,25 "
                  fill="freeze"
                />
              </polygon>

              <polygon
                style={{ fill: "#fff", stroke: "none" }}
                points="40,25 10,45 10,5 40,25 "
                id="shape2"
              >
                <animate
                  id="animPauseTwo"
                  begin="indefinite"
                  attributeName="points"
                  dur="500ms"
                  to="35,45 45,45 45,5 35,5 "
                  fill="freeze"
                />
                <animate
                  id="animPlayTwo"
                  begin="indefinite"
                  attributeName="points"
                  dur="500ms"
                  to="40,25 10,45 10,5 40,25 "
                  fill="freeze"
                />
              </polygon>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex w-full justify-end flex-grow md:items-center md:w-auto md:flex-grow uppercase">
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="landing"
            spy={true}
            smooth={true}
            className="text-lg 2xl:text-2xl cursor-pointer block mt-4 lg:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Home
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="gigs"
            spy={true}
            smooth={true}
            className=" text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Gigs
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="bio"
            spy={true}
            smooth={true}
            className="text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Bio
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="listen"
            spy={true}
            smooth={true}
            className="text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
            duration={500}
          >
            Listen
          </Link>
          <Link
            activeClass="text-bubblegum hover:cursor-default"
            to="watch"
            spy={true}
            smooth={true}
            className="text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
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
            className="text-lg 2xl:text-2xl cursor-pointer block mt-4 md:inline-block md:mt-0 hover:text-bubblegum mr-4"
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
