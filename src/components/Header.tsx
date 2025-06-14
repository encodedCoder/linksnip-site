"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={`relative max-w-5xl w-full rounded-full backdrop-blur-md border border-white/20 flex items-center justify-between px-6 py-3 transition-all duration-300 ${
          isScrolled ? "bg-white/10 shadow-lg" : "bg-white/5"
        }`}
      >
        {/* Glossy reflection effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-12"></div>
        </div>

        {/* Logo with Favicon */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/">
            <div className="group relative flex items-center gap-2">
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 scale-[1.5] rounded-full bg-purple-500/50 filter blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Logo and text as a single element */}
              <div className="relative flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/favicon.ico"
                    alt="LinkSnip Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-['Montserrat',sans-serif]">
                  LinkSnip
                </span>
                <span className="text-pink-400 text-lg">✂️</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem label="Home" />
          <NavItem label="My Links" />
          <NavItem label="API" />
          <NavItem label="Pricing" />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Profile link */}
          <motion.a
            href="https://www.encodedcoder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x"></div>
            <div className="px-5 py-1.5 bg-black/20 backdrop-blur-sm relative z-10 flex items-center gap-2 border border-white/20">
              <span className="font-bold text-white">Created by Suresh</span>
            </div>
          </motion.a>

          {/* Sign In Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/signin"
              className="px-5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <span
              className={`block relative w-5 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            ></span>
            <span
              className={`block relative w-5 h-0.5 bg-white mt-1 transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block relative w-5 h-0.5 bg-white mt-1 transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-[72px] left-0 right-0 px-4 z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="max-w-5xl mx-auto rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 bg-white/5 shadow-lg"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col gap-2 p-4">
                {["Home", "My Links", "API", "Pricing"].map((item) => (
                  <Link
                    key={item}
                    href={`/${
                      item === "Home"
                        ? ""
                        : item.toLowerCase().replace(" ", "-")
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <div className="w-full py-3 px-4 rounded-xl hover:bg-white/10 transition-all">
                      {item}
                    </div>
                  </Link>
                ))}
                {/* Mobile profile link */}
                <Link
                  href="https://www.encodedcoder.com"
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <div className="w-full py-3 px-4 rounded-xl text-center font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:brightness-110 transition-all shadow-md">
                    Created by Suresh
                  </div>
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <div className="w-full py-3 rounded-xl text-center font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 transition-all shadow-md">
                    Sign In
                  </div>
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Individual nav item with animation
function NavItem({ label }: { label: string }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="relative group">
      <Link
        href={`/${
          label === "Home" ? "" : label.toLowerCase().replace(" ", "-")
        }`}
        className="text-white/80 hover:text-white transition-colors"
      >
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </motion.div>
  );
}
