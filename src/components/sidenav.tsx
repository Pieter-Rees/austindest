"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";

import Socials from "./socials";

interface sideNavProps {
  handleToggle: Function;
  showSideNav: boolean;
}

export default function Sidenav(props: sideNavProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <nav
      className={`block lg:hidden transition-all fixed left-0 top-0 h-full w-80 overflow-hidden bg-background/95 backdrop-blur-md border-r border-border transform-gpu ${
        props.showSideNav ? "" : "-translate-x-full"
      }`}
    >
      <div className="p-8">
        <div className="flex flex-col justify-center w-full gap-6 mt-8">
          <Link
            activeClass="text-accent font-semibold"
            to="landing"
            spy={true}
            smooth={true}
            offset={-80}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Home</span>
          </Link>
          <Link
            activeClass="text-accent font-semibold"
            to="gigs"
            spy={true}
            smooth={true}
            offset={-80}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Gigs</span>
          </Link>
          <Link
            activeClass="text-accent font-semibold"
            to="bio"
            spy={true}
            smooth={true}
            offset={-80}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Bio</span>
          </Link>
          <Link
            activeClass="text-accent font-semibold"
            to="listen"
            spy={true}
            offset={-80}
            smooth={true}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Listen</span>
          </Link>
          <Link
            activeClass="text-accent font-semibold"
            to="watch"
            spy={true}
            smooth={true}
            offset={-80}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Watch</span>
          </Link>
          <Link
            activeClass="text-accent font-semibold"
            to="contact"
            spy={true}
            offset={-80}
            smooth={true}
            className="text-2xl text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
            duration={500}
          >
            <span onClick={() => props.handleToggle()}>Contact</span>
          </Link>
        </div>
        <div className="mt-16">
          <Socials />
        </div>
      </div>
    </nav>
  );
}
