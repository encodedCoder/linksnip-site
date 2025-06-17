"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Get higher resolution image from Google or other providers
const getHighResImage = (imageUrl: string) => {
  if (!imageUrl) return "";

  // For Google profile pictures (ending with =s96-c or similar)
  if (
    imageUrl.includes("googleusercontent.com") &&
    imageUrl.match(/=s\d+-c$/)
  ) {
    // Replace the size parameter with a larger one (s400-c for 400px)
    return imageUrl.replace(/=s\d+-c$/, "=s400-c");
  }

  return imageUrl;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const links = [];
  // setLinks([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user links when session is available
    if (session) {
      setIsLoading(false);
      // Future implementation: fetchUserLinks(session.user.id)
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="flex-grow flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sign In Required
            </h2>
            <p className="text-white/70 mb-6">
              Please sign in to view your profile.
            </p>
            <a
              href="/signin"
              className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-25 min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-lg shadow-purple-500/20">
                  {session.user?.image ? (
                    <Image
                      src={getHighResImage(session.user.image)}
                      alt={session.user?.name || "User"}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                      {(session.user?.name || "U").charAt(0)}
                    </div>
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 h-4 w-4 bg-purple-500 rounded-full"></div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 bg-gradient-to-r from-white via-purple-300 to-pink-200 bg-clip-text text-transparent">
                  {session.user?.name || "User"}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <svg
                    className="w-4 h-4 text-pink-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-white/70">{session.user?.email}</span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                  >
                    Share Profile
                  </motion.button>
                </div>
              </div>
            </div>

            {/* User since & account status badges */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-white text-sm">
                Member since 2023
              </span>
              <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-white text-sm">
                Free Account
              </span>
            </div>
          </motion.div>

          {/* Stats and Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Statistics
            </h2>

            <div className="space-y-8">
              {/* Profile stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-white/60">Total Links</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>

                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-white/60">Total Clicks</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>

                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-white/60">Active Links</p>
                  <p className="text-xl font-bold text-white">0</p>
                </div>

                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-white/60">Avg. CTR</p>
                  <p className="text-xl font-bold text-white">0%</p>
                </div>
              </div>

              {/* Recent links section */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4">
                  Recent Links
                </h2>
                {links.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-white">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left pb-2">Short URL</th>
                          <th className="text-left pb-2">Original URL</th>
                          <th className="text-left pb-2">Clicks</th>
                          <th className="text-left pb-2">Created</th>
                        </tr>
                      </thead>
                      <tbody>{/* Will be populated with real data */}</tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/70">
                      You haven&apos;t created any links yet.
                      <Link
                        href="/"
                        className="mt-4 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
                      >
                        Create Your First Link
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
