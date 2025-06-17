// filepath: src/components/UserNav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface UserNavProps {
  isMobile?: boolean;
}

// Separate component for the dialog to use with portal
const SignOutConfirmationDialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="bg-black/90 border border-white/20 rounded-2xl p-6 max-w-sm w-full m-4">
        <h3 className="text-lg font-medium text-white mb-2">Sign out</h3>
        <p className="text-white/70 mb-6">Are you sure you want to sign out?</p>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-xl text-center font-medium bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl text-center font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-110 transition-all shadow-md"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default function UserNav({ isMobile = false }: UserNavProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
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

  const handleSignOut = () => {
    setShowSignOutConfirmation(false);
    signOut();
  };

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
            ? "block w-full py-3 rounded-xl text-center font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 transition-all shadow-md"
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
      <>
        <button
          onClick={() => setShowSignOutConfirmation(true)}
          className="w-full py-3 rounded-xl text-center font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-110 transition-all shadow-md"
        >
          Sign Out
        </button>

        {/* Sign Out Confirmation Dialog - rendered with portal */}
        {showSignOutConfirmation &&
          typeof document !== "undefined" &&
          createPortal(
            <SignOutConfirmationDialog
              onCancel={() => setShowSignOutConfirmation(false)}
              onConfirm={handleSignOut}
            />,
            document.body
          )}
      </>
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
        className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
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
        <div className="absolute right-0 mt-2 z-50 isolate">
          <div className="pb-4 w-56 rounded-2xl shadow-xl border border-white/20 bg-black/60 backdrop-blur-md backdrop-filter overflow-hidden">
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
                onClick={() => setShowSignOutConfirmation(true)}
                className="w-[calc(100%-2rem)] mx-4 mt-4 py-2 rounded-xl text-center font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:brightness-110 transition-all shadow-md cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Dialog - rendered with portal */}
      {showSignOutConfirmation &&
        typeof document !== "undefined" &&
        createPortal(
          <SignOutConfirmationDialog
            onCancel={() => setShowSignOutConfirmation(false)}
            onConfirm={handleSignOut}
          />,
          document.body
        )}
    </div>
  );
}
