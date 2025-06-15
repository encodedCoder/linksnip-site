// filepath: src/components/UserNav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

interface UserNavProps {
  isMobile?: boolean;
}

export default function UserNav({ isMobile = false }: UserNavProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading)
    return (
      <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
    );

  // In mobile view and not signed in - show sign in button
  if (!session) {
    return (
      <Link
        href="/signin"
        className={
          isMobile
            ? "w-full py-3 rounded-xl text-center font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 transition-all shadow-md"
            : "px-5 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
        }
      >
        Sign In
      </Link>
    );
  }

  // For mobile view and already signed in - just show sign out button
  if (isMobile) {
    return (
      <button
        onClick={() => signOut()}
        className="w-full py-3 rounded-xl text-center font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-110 transition-all shadow-md"
      >
        Sign Out
      </button>
    );
  }

  // For desktop view - show dropdown menu
  // Truncate name to 15 characters
  const displayName = session.user?.name || "User";
  const truncatedName =
    displayName.length > 15
      ? `${displayName.substring(0, 15)}...`
      : displayName;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center space-x-2"
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user?.name || "User"}
            width={24}
            height={24}
            className="rounded-full"
          />
        ) : (
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            {(session.user?.name || "U").charAt(0)}
          </div>
        )}
        <span className="text-sm">{truncatedName}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg backdrop-blur-md border border-white/20 bg-black/40 ring-1 ring-white/10 z-50">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-white/20">
              <p className="text-sm font-medium text-white">
                {session.user?.name}
              </p>
              <p className="text-xs text-white/70 truncate">
                {session.user?.email}
              </p>
            </div>

            {/* Profile link */}
            <Link
              href="/profile"
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>

            {/* Settings link */}
            <Link
              href="/settings"
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>

            {/* Divider */}
            <div className="border-t border-white/20 my-1"></div>

            {/* Sign out button */}
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-pink-400 hover:bg-white/10 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
