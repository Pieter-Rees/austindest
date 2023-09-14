"use client";
import { animateScroll as scroll } from "react-scroll";
import Logo from "./logo";
import Socials from "./socials";
export default function Copyright() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const year = new Date().getFullYear();

  return (
    <div className="relative z-3 grid lg:grid-cols-2 gap-4 bg-black backdrop-blur-md p-8">
      <Socials />
      <div className="block lg:hidden">
        <hr />
      </div>
      <div className=" flex flex-col items-center">
        <div
          className="cursor-pointer mt-4 lg:mt-0 transition-all fill-white hover:fill-bubblegum ease-in-out"
          onClick={() => scrollToTop()}
        >
          <Logo />
        </div>

        <div className="text-center 2xl:text-2xl mt-4">Copyright © {year}</div>
        <div className="text-center 2xl:text-2xl">Austin Dest</div>
      </div>
    </div>
  );
}
