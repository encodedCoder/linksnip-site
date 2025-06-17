"use client";

import React from "react";
import { motion } from "framer-motion";

const PricingPage = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for casual users",
      features: [
        "Up to 10 shortened links",
        "Basic analytics",
        "24 hour support",
        "Random short URLs",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Great for professionals",
      features: [
        "Unlimited shortened links",
        "Detailed analytics",
        "Priority support",
        "Custom short URLs",
        "QR code generation",
        "Link expiration control",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "Max",
      price: "$19",
      period: "per month",
      description: "For businesses & teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Branded domains",
        "API access",
        "Advanced security",
        "Dedicated account manager",
      ],
      cta: "Get Max",
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="flex-grow container mx-auto px-4 py-16 pt-25">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Choose the plan that works best for your needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className="relative mt-4" /* Added mt-4 to leave space for the badge */
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full z-10">
                    Most Popular
                  </div>
                )}

                <div
                  className={`h-full rounded-2xl overflow-hidden backdrop-blur-md relative ${
                    tier.popular
                      ? "border-2 border-pink-500/20"
                      : "border border-white/20"
                  }`}
                >
                  {/* Glassmorphism highlight effect */}
                  <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

                  {/* Background tint based on tier */}
                  <div
                    className={`relative bg-white/10 p-8 flex flex-col h-full ${
                      tier.popular ? "bg-purple-500/50" : ""
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {tier.name}
                    </h3>

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">
                        {tier.price}
                      </span>
                      <span className="text-white/60 ml-2">{tier.period}</span>
                    </div>

                    <p className="text-white/80 mb-6">{tier.description}</p>

                    <ul className="mb-8 space-y-3 flex-grow">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-white/70">
                          <svg
                            className="w-5 h-5 text-green-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        tier.popular
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:brightness-110"
                          : "bg-white/20 text-white hover:bg-white/25"
                      }`}
                    >
                      {tier.cta}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Need a custom plan for your enterprise?
            </h3>
            <p className="text-white/70 mb-6">
              Contact us for a tailored solution to meet your specific
              requirements
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default PricingPage;
