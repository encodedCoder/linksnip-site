// filepath: src/components/UserNav.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function UserNav() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>;

  if (!session) {
    return (
      <Link
        href="/signin"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-700">
          {session.user?.name || "User"}
        </div>
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user?.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {(session.user?.name || "U").charAt(0)}
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}