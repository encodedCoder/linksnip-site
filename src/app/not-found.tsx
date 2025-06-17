"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function NotFound() {
  // This is crucial - forcibly replace the layout
  useEffect(() => {
    // Get the header and footer elements if they exist
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    // Hide them if they exist
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    // Clean up when component unmounts
    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-20 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Glassmorphism card with glossy effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
        >
          {/* Glossy highlight */}
          <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

          {/* Glossy container */}
          <div className="relative bg-white/10 backdrop-blur-md backdrop-filter border border-white/30 rounded-2xl p-8 shadow-xl text-center">
            <h1 className="text-5xl font-bold mb-2 text-white">404</h1>
            <h2 className="text-2xl font-semibold mb-6 text-white/90">
              Page Not Found
            </h2>

            {/* App logo and name */}
            <div className="mb-6">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/favicon.ico"
                  alt="LinkSnip logo"
                  width={40}
                  height={40}
                  className="mr-3"
                />
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  LinkSnip
                </span>
              </motion.div>
              <p className="text-white/70 mt-2">
                Transform long URLs into short, shareable links in seconds
              </p>
            </div>

            <p className="text-white/70 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="inline-block px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 transition-all"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
