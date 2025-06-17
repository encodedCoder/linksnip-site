"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [contactFormState, setContactFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    null | "sending" | "success" | "error"
  >(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    // Simulate form submission with a timeout
    setTimeout(() => {
      setFormStatus("success");
      setContactFormState({ name: "", email: "", message: "" });

      // Reset status after a delay
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1500);
  };

  // Team members data
  const teamMembers = [
    {
      name: "Suresh",
      role: "Founder & CEO",
      bio: "Leading the vision and development of LinkSnip.",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocJ1mp1jAEkN6ayGk2969OFuEO2zInuQyBiG-BFvfkxwe5G15KMu=s360-c-no",
    },
    {
      name: "Shrey Dhiman",
      role: "Lead Developer",
      bio: "Architecture mastermind behind LinkSnip's robust platform.",
      image:
        "https://images.unsplash.com/photo-1748771748590-a5347a9de086?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Shubham Kapoor",
      role: "Head of Design",
      bio: "Creating the beautiful, intuitive interfaces that make LinkSnip unique.",
      image:
        "https://images.pexels.com/photos/31760040/pexels-photo-31760040.jpeg",
    },
  ];

  // Platform features
  const features = [
    {
      title: "Lightning Fast URL Shortening",
      description:
        "Create concise, memorable links in seconds with our powerful shortening engine.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Track clicks, geographic data, devices, and referrers to optimize your links' performance.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Custom URLs",
      description:
        "Create branded, memorable links with your own custom slugs to enhance recognition.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      ),
    },
    {
      title: "QR Code Generation",
      description:
        "Instantly generate scannable QR codes for all your shortened links.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Powerful API",
      description:
        "Integrate LinkSnip's functionality into your applications with our robust API.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
      ),
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Rest easy with our advanced security measures protecting your links and data.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <main className="flex-grow pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              About LinkSnip
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-white/70 max-w-2xl mx-auto"
            >
              Making the web more accessible, one short link at a time
            </motion.p>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/80">
              At LinkSnip, we believe in simplifying the way people share
              information online. Our mission is to provide a reliable, secure,
              and feature-rich URL shortening service that empowers individuals
              and businesses to share links efficiently while gaining valuable
              insights into their audience.
            </p>
            <p className="text-white/80 mt-4">
              Founded in 2023, we&apos;ve been committed to delivering a
              seamless experience for our users while continuously evolving our
              platform with cutting-edge features and robust security measures.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Glassmorphism highlight effect */}
                  <div className="relative overflow-hidden">
                    <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

                    <div className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                        <div className="rounded-full overflow-hidden bg-gray-800 w-full h-full flex items-center justify-center">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            priority
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-pink-400">{member.role}</p>
                      <p className="text-white/70 mt-4">{member.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Get in Touch
            </h2>
            <p className="text-white/70 text-center mb-8">
              Have questions or feedback? We&apos;d love to hear from you!
            </p>

            <div className="max-w-2xl mx-auto">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-green-500/20 border border-green-500/30 text-center"
                >
                  <svg
                    className="w-12 h-12 text-green-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-white/80">
                    Your message has been sent. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={contactFormState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={contactFormState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white/80 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactFormState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your message..."
                    />
                  </div>

                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:brightness-110 transition-all disabled:opacity-70"
                    >
                      {formStatus === "sending" ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
