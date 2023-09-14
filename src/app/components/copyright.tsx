"use client";
import { animateScroll as scroll } from "react-scroll";
import Logo from "./logo";
export default function Copyright() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <div className="relative z-3 bg-black backdrop-blur-md p-8 flex flex-col items-center">
      <div
        className="cursor-pointer  transition-all fill-white hover:fill-bubblegum ease-in-out cursor-grab"
        onClick={() => scrollToTop()}
      >
        <Logo />
      </div>

      <hr />
      <div className="text-center text-lg">Copyright © 2023 Austin dest</div>
    </div>
  );
}
