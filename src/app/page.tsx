"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrVisible, setQrVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  const validateCustomSlug = (slug: string) => {
    // Allow alphanumeric characters, hyphens, and dashes
    return /^[a-zA-Z0-9-_]*$/.test(slug);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!url) return;

    if (customSlug && !validateCustomSlug(customSlug)) {
      setError(
        "Custom URL can only contain letters, numbers, hyphens and underscores"
      );
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customSlug }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to shorten URL");
        return;
      }

      setShortUrl(data.shortUrl);
      setQrVisible(false);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleQrCode = () => {
    setQrVisible(!qrVisible);
  };

  const downloadQrCode = () => {
    if (!qrRef.current) return;

    // Get the SVG element
    const svgElement = qrRef.current;

    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Add null check for ctx
    if (!ctx) {
      console.error("Canvas context not supported");
      return;
    }

    // Create an image from the SVG
    const img = new (window.Image || Image)();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;

      // Draw white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Create a download link and trigger it
      const downloadLink = document.createElement("a");
      downloadLink.download = "linksnip-qr.png";
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.click();

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-20">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-slow"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Light burst effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-5 blur-3xl brightness-[10] rounded-full"></div>

        {/* Logo and header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8 pt-16 sm:pt-0"
        >
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
            <Image
              src="icon0.svg"
              alt="LinkSnip logo"
              width={50}
              height={50}
              className="mr-3"
            />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              LinkSnip
            </span>
          </h1>
          <p className="text-white/70">
            Transform long URLs into short, shareable links in seconds
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          {/* Glassmorphism card with glossy effect */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            {/* Glossy highlight */}
            <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

            {/* Glossy container */}
            <div className="relative bg-white/10 backdrop-blur-md backdrop-filter border border-white/30 rounded-2xl p-6 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Long URL input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white/50"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    placeholder="Paste long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 placeholder:text-white/50 text-white focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>

                {/* Custom slug input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Custom URL (optional)"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-3 pl-10 pr-4 placeholder:text-white/50 text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40 text-xs">
                    linksnip.site/
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !url}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/10 group"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                      Snipping...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Snip URL
                      <svg
                        className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                  )}
                </button>
              </form>

              {shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <p className="text-sm text-white/70 mb-2">
                    Your shortened URL:
                  </p>
                  <div className="flex items-stretch rounded-lg overflow-hidden bg-white/5 border border-white/20 mb-4">
                    <div className="flex-grow truncate p-3 text-white">
                      {shortUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center justify-center px-4 bg-white/10 hover:bg-white/25 active:brightness-90 transition-all"
                    >
                      {copied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* QR Code section */}
                  <div className="flex gap-2">
                    <button
                      onClick={toggleQrCode}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 px-3 rounded-lg border border-white/10 transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                      {qrVisible ? "Hide QR Code" : "Show QR Code"}
                    </button>
                  </div>

                  {qrVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 flex flex-col items-center p-4 bg-white rounded-lg"
                    >
                      <div className="mb-3">
                        <QRCodeSVG
                          value={shortUrl}
                          size={200}
                          level="H"
                          ref={qrRef}
                          includeMargin={true}
                        />
                      </div>
                      <button
                        onClick={downloadQrCode}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg transition-all hover:shadow-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download QR Code
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        {/* <div className="mt-12 text-white/50 text-sm">
          Made with ❤️ by LinkSnip Team
        </div> */}
      </main>
      <Footer />
    </>
  );
}
