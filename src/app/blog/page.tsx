"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Sample blog post data (keep your existing data)
const blogPosts = [
  {
    id: 1,
    title: "Introducing LinkSnip: The Future of URL Shortening",
    excerpt:
      "Learn how LinkSnip is revolutionizing the way we share links online with powerful features and analytics.",
    date: "June 10, 2025",
    author: "Suresh",
    category: "Product Updates",
    image: "/images/blog/placeholder1.jpg",
    slug: "introducing-linksnip",
  },
  {
    id: 2,
    title: "5 Ways to Optimize Your Short Links for Better Engagement",
    excerpt:
      "Discover proven strategies to increase click-through rates and engagement with your shortened URLs.",
    date: "June 5, 2025",
    author: "Suresh",
    category: "Tips & Tricks",
    image: "/images/blog/placeholder2.jpg",
    slug: "optimize-short-links-engagement",
  },
  {
    id: 3,
    title: "LinkSnip API: Building Powerful Integrations",
    excerpt:
      "A comprehensive guide to using LinkSnip's API for creating custom integrations and workflows.",
    date: "May 28, 2025",
    author: "Suresh",
    category: "Developers",
    image: "/images/blog/placeholder3.jpg",
    slug: "linksnip-api-integrations",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black bg-grid-small-white/[0.2] relative">
      {/* Background gradient elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]"></div>

      <motion.div
        className="flex-grow flex flex-col z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Your existing blog page content */}
        <motion.main
          className="flex-grow pt-32 pb-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LinkSnip Blog
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Insights, updates, and best practices for URL shortening and
                link management
              </p>
            </motion.div>

            {/* Featured post */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="md:grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2 className="text-3xl font-bold text-white text-center px-4">
                        Featured Post
                      </h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-pink-400 font-semibold">
                      {blogPosts[0].category}
                    </div>
                    <Link
                      href={`/blog/${blogPosts[0].slug}`}
                      className="block mt-2"
                    >
                      <p className="text-2xl font-semibold text-white hover:text-pink-300 transition-colors">
                        {blogPosts[0].title}
                      </p>
                    </Link>
                    <p className="mt-3 text-gray-300">{blogPosts[0].excerpt}</p>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{blogPosts[0].author}</span>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {blogPosts[0].author.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {blogPosts[0].author}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-400">
                          <time dateTime="2020-03-16">{blogPosts[0].date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog post list */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 h-48 bg-gradient-to-r from-purple-600 to-pink-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xl font-bold text-white">
                        {post.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <p className="text-xl font-semibold text-white hover:text-pink-300 transition-colors">
                          {post.title}
                        </p>
                        <p className="mt-3 text-gray-300 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{post.author}</span>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {post.author}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-400">
                          <time dateTime="2020-03-16">{post.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Subscribe to our newsletter
                </h2>
                <p className="text-gray-300 mb-6">
                  Get the latest LinkSnip news and updates delivered to your
                  inbox
                </p>
                <form className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </motion.div>
    </div>
  );
}
