"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("account");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sign In Required
            </h2>
            <p className="text-white/70 mb-6">
              Please sign in to access your settings.
            </p>
            <a
              href="/signin"
              className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium"
            >
              Sign In
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

          {/* Settings Navigation */}
          <div className="flex overflow-x-auto mb-6">
            <div className="flex space-x-1 p-1 bg-white/5 backdrop-blur-sm rounded-lg">
              {["account", "appearance", "api", "notifications", "billing"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-purple-500/80 text-white"
                        : "text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Settings Content */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            {activeTab === "account" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">
                  Account Settings
                </h2>

                {/* Profile Information */}
                <div className="rounded-xl p-6 bg-white/5 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Profile Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        defaultValue={session.user?.name || ""}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/70 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        defaultValue={session.user?.email || ""}
                        disabled
                      />
                      <p className="mt-1 text-xs text-white/50">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:brightness-110 transition-all"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="rounded-xl p-6 bg-white/5 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Change Password
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-white/70 mb-1"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-white/70 mb-1"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-white/70 mb-1"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:brightness-110 transition-all"
                      >
                        Update Password
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl p-6 bg-red-500/10 border border-red-500/20">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Danger Zone
                  </h3>
                  <p className="text-white/70 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 font-medium hover:bg-red-500/30 transition-all"
                  >
                    Delete Account
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">API Settings</h2>

                <div className="rounded-xl p-6 bg-white/5 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">
                    API Keys
                  </h3>
                  <p className="text-white/70 mb-6">
                    Manage your API keys to integrate LinkSnip with your
                    applications.
                  </p>

                  <div className="space-y-6">
                    <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                      <p className="text-white/70 mb-2 text-sm">
                        No API keys found
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:brightness-110 transition-all"
                      >
                        Generate API Key
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "appearance" ||
              activeTab === "notifications" ||
              activeTab === "billing") && (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  className="w-16 h-16 text-white/30 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-white mb-2">
                  Coming Soon
                </h3>
                <p className="text-white/70 text-center max-w-md">
                  This feature is currently under development and will be
                  available soon.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
