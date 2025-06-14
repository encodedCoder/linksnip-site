"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

        {/* Logo */}
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-['Montserrat',sans-serif]">
                LinkSnip
              </span>
              <span className="text-pink-400 text-xl">✂️</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {["Home", "My Links", "API"].map((item) => (
            <NavItem key={item} label={item} />
          ))}

          {/* Sign In Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link href="/signin">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 text-white font-medium py-2 px-4 rounded-xl transition shadow-md hover:shadow-lg">
                Sign In
              </button>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }
                }
                className="w-4 h-0.5 bg-white mb-1 block"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-4 h-0.5 bg-white mb-1 block"
              />
              <motion.span
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -3 }
                    : { rotate: 0, y: 0 }
                }
                className="w-4 h-0.5 bg-white block"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glossy effect for mobile menu */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-12"></div>
              </div>

              <nav className="flex flex-col space-y-3 relative z-10">
                {["Home", "My Links", "API"].map((item) => (
                  <Link
                    key={item}
                    href={`/${
                      item === "Home"
                        ? ""
                        : item.toLowerCase().replace(" ", "-")
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium text-center">
                      {item}
                    </div>
                  </Link>
                ))}
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
