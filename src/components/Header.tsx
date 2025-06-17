"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import UserNav from "./UserNav";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        hamburgerRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
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
        <div className="flex items-center transition-transform hover:scale-105">
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
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  LinkSnip
                </span>
                {/* <span className="text-pink-400 text-lg">✂️</span> */}
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem label="Home" />
          <NavItem label="My Links" />
          <NavItem label="API" />
          <NavItem label="Pricing" />
          <NavItem label="About" />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Profile link */}
          {/* <a
            href="https://www.encodedcoder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x"></div>
            <div className="px-5 py-1.5 bg-black/20 backdrop-blur-sm relative z-10 flex items-center gap-2 ">
              <span className="font-bold text-white">Created by Suresh</span>
            </div>
          </a> */}

          {/* UserNav component */}
          <UserNav />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            ref={hamburgerRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center relative">
              <span
                className={`block absolute w-5 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? "rotate-45" : "translate-y-[-4px]"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block absolute w-5 h-0.5 bg-white transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 px-4 z-40 transition-all">
          <div
            ref={mobileMenuRef}
            className="max-w-5xl mx-auto rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 bg-white/5 shadow-lg transition-all"
          >
            <div className="p-5 space-y-4">
              {/* Mobile Nav Items */}
              <div className="flex flex-col space-y-3">
                <MobileNavItem
                  label="Profile"
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="Settings"
                  href="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                {/* <MobileNavItem label="Home" href="/" onClick={() => setIsMobileMenuOpen(false)} /> */}
                <MobileNavItem
                  label="My Links"
                  href="/my-links"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="API"
                  href="/api-docs"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="Pricing"
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="Blog"
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="About"
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-3"></div>

              {/* Legal Pages */}
              <div className="flex flex-col space-y-3">
                <MobileNavItem
                  label="Privacy Policy"
                  href="/privacy"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  label="Terms of Service"
                  href="/terms"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-3"></div>

              {/* Sign Out Button for Mobile */}
              <div className="mt-4">
                <UserNav isMobile={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// Individual nav item with animation
function NavItem({ label }: { label: string }) {
  return (
    <div className="relative group transition-transform hover:scale-110">
      <Link
        href={`/${
          label === "Home"
            ? ""
            : label === "API"
            ? "api-docs"
            : label.toLowerCase().replace(" ", "-")
        }`}
        className="text-white/80 hover:text-white transition-colors"
      >
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </div>
  );
}

// Mobile nav item component
function MobileNavItem({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="w-full px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
