"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

import { NAV_ITEMS } from "@/constants/navigation";
import { useAppStore } from "@/lib/store";

import Logo from "./logo";
import Sidenav from "./sidenav";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const {
    showSideNav,
    navBackground,
    activeSection,
    setNavBackground,
    setActiveSection,
    toggleSideNav,
  } = useAppStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavBackground(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavBackground, isClient]);

  useEffect(() => {
    if (!isClient) return;

    scrollSpy.update();
    Events.scrollEvent.register("begin", () => {});
    Events.scrollEvent.register("end", () => {});

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, [isClient]);

  const scrollToTop = () => {
    if (!isClient) return;
    scroll.scrollToTop({ duration: 500 });
  };

  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-foreground hover:text-muted transition-colors duration-200"
            >
              <Logo />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navBackground
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-foreground hover:text-muted transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo />
          </motion.button>

          <motion.button
            onClick={toggleSideNav}
            className="md:hidden text-foreground hover:text-muted transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {showSideNav ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                duration={500}
                offset={-80}
                className={`text-foreground hover:text-muted transition-colors duration-200 cursor-pointer font-medium ${
                  activeSection === item.id ? "text-accent font-semibold" : ""
                }`}
                onSetActive={() => setActiveSection(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Sidenav showSideNav={showSideNav} handleToggle={toggleSideNav} />
    </motion.nav>
  );
}
