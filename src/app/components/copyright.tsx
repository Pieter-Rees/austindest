"use client";
import Image from "next/image";
import { animateScroll as scroll } from "react-scroll";

export default function Copyright() {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <div className="relative z-3 bg-black backdrop-blur-md p-8 flex flex-col items-center">
      <Image
        className="cursor-pointer"
        onClick={() => scrollToTop()}
        src="/logo.png"
        alt="Picture of the author"
        width={60}
        height={60}
      />
      <hr />
      <div className="text-center text-lg">Copyright © 2023 Austin dest</div>
    </div>
  );
}
