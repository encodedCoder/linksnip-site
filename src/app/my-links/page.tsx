"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dummy data type definition
type LinkData = {
  longUrl: string;
  shortUrl: string;
  isCustom: boolean;
  generatedOn: Date;
  validTill: Date | null;
};

export default function MyLinks() {
  // Dummy data for the links
  const [links, setLinks] = useState<LinkData[]>([
    {
      longUrl:
        "https://www.example.com/very/long/url/that/needs/shortening/for/better/sharing",
      shortUrl: "https://linksnip.site/abc123",
      isCustom: false,
      generatedOn: new Date(2023, 9, 15),
      validTill: null,
    },
    {
      longUrl: "https://www.developer-documentation.com/react/hooks/useeffect",
      shortUrl: "https://linksnip.site/react-hooks",
      isCustom: true,
      generatedOn: new Date(2023, 9, 10),
      validTill: new Date(2023, 12, 31),
    },
    {
      longUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      shortUrl: "https://linksnip.site/music",
      isCustom: true,
      generatedOn: new Date(2023, 8, 5),
      validTill: new Date(2024, 8, 5),
    },
    {
      longUrl: "https://github.com/features/copilot",
      shortUrl: "https://linksnip.site/def456",
      isCustom: false,
      generatedOn: new Date(2023, 9, 18),
      validTill: null,
    },
  ]);

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "Never expires";
    return date.toLocaleDateString();
  };

  // Copy shortUrl to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Delete a link (just removes from the state in this example)
  const deleteLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />

      <motion.div
        className="flex-grow container mx-auto px-4 py-8 pt-25"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Links{" "}
          {/* <span className="ml-2 text-pink-400" role="img" aria-label="scissors">
            ✂️
          </span> */}
        </motion.h1>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Glossy highlight */}
                <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

                {/* Card content */}
                <div className="relative bg-white/10 backdrop-blur-md backdrop-filter border border-white/30 p-6 h-full">
                  {/* Original URL */}
                  <h3 className="font-medium text-white mb-1">Original URL</h3>
                  <p className="text-white/70 mb-4 text-sm truncate">
                    {link.longUrl}
                  </p>

                  {/* Short URL */}
                  <h3 className="font-medium text-white mb-1">Short URL</h3>
                  <div className="flex items-center mb-4">
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm truncate"
                    >
                      {link.shortUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(link.shortUrl)}
                      className="ml-2 p-1 text-white/70 hover:text-white"
                      title="Copy to clipboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Info grid */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div>
                      <h4 className="text-white/80">Custom</h4>
                      <p className="text-white">
                        {link.isCustom ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white/80">Generated</h4>
                      <p className="text-white">
                        {formatDate(link.generatedOn)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white/80">Valid Till</h4>
                      <p className="text-white">{formatDate(link.validTill)}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => copyToClipboard(link.shortUrl)}
                      className="px-3 py-1 bg-indigo-600/70 hover:bg-indigo-500/70 text-white text-sm rounded-md mr-2 transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => deleteLink(index)}
                      className="px-3 py-1 bg-red-600/70 hover:bg-red-500/70 text-white text-sm rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}
