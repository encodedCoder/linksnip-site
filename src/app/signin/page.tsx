"use client";

import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function SignIn() {
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
        <Suspense fallback={<div>Loading...</div>}>
          <SignInContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

// Extract the part that uses useSearchParams into a separate component
function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  return (
    <div className="w-full max-w-md p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg z-10">
      {/* Include your existing sign-in form content here */}
      {error && <p className="text-red-500">Authentication error: {error}</p>}
      {/* Your sign-in buttons that use callbackUrl */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Sign in to LinkSnip
        </h1>
        <p className="text-white/70 mb-6">
          Sign in or create an account to manage your shortened links
        </p>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-400 bg-red-500/10 rounded-lg border border-red-500/20 mb-6">
          {error === "OAuthAccountNotLinked"
            ? "To confirm your identity, sign in with the same account you used originally."
            : "An error occurred during sign in. Please try again."}
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl shadow-sm transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/10"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
