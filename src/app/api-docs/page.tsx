"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ApiPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  // API examples
  const shortenUrlExample = `fetch('https://linksnip.site/api/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url/that/needs/shortening',
    customSlug: 'my-custom-link' // Optional
  })
})
.then(response => response.json())
.then(data => console.log(data))`;

  const retrieveUrlExample = `fetch('https://linksnip.site/api/links/my-custom-link', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))`;

  const listLinksExample = `fetch('https://linksnip.site/api/links?page=1&limit=10', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))`;

  const analyticsExample = `fetch('https://linksnip.site/api/analytics/my-custom-link?period=month', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))`;

  // API endpoints
  const endpoints = [
    {
      id: "shorten",
      method: "POST",
      path: "/api/shorten",
      description: "Shorten a URL with optional custom slug",
      example: shortenUrlExample,
      parameters: [
        {
          name: "url",
          type: "string",
          required: true,
          description: "The URL to be shortened",
        },
        {
          name: "customSlug",
          type: "string",
          required: false,
          description: "Custom slug for the shortened URL",
        },
      ],
      responses: [
        {
          status: 200,
          description: "Returns the shortened URL",
          example: '{"shortUrl": "https://linksnip.site/abc123"}',
        },
        {
          status: 400,
          description: "Bad request, invalid URL or parameters",
          example: '{"error": "URL is required"}',
        },
        {
          status: 409,
          description: "Conflict, custom slug already in use",
          example: '{"error": "This custom URL is already taken"}',
        },
      ],
    },
    {
      id: "retrieve",
      method: "GET",
      path: "/api/links/{slug}",
      description: "Retrieve information about a specific shortened link",
      example: retrieveUrlExample,
      parameters: [
        {
          name: "slug",
          type: "string",
          required: true,
          description: "The slug of the shortened URL",
        },
      ],
      responses: [
        {
          status: 200,
          description: "Returns information about the link",
          example:
            '{"slug": "abc123", "originalUrl": "https://example.com/very/long/url", "createdAt": "2023-10-15T12:00:00Z", "clicks": 42}',
        },
        {
          status: 404,
          description: "Not found, link doesn't exist",
          example: '{"error": "Link not found"}',
        },
      ],
    },
    {
      id: "list",
      method: "GET",
      path: "/api/links",
      description: "List all shortened links associated with your account",
      example: listLinksExample,
      parameters: [
        {
          name: "page",
          type: "number",
          required: false,
          description: "Page number for pagination",
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Number of items per page",
        },
      ],
      responses: [
        {
          status: 200,
          description: "Returns a list of links",
          example: '{"links": [...], "total": 42, "page": 1, "pages": 5}',
        },
      ],
    },
    {
      id: "analytics",
      method: "GET",
      path: "/api/analytics/{slug}",
      description: "Get analytics for a specific shortened link",
      example: analyticsExample,
      parameters: [
        {
          name: "slug",
          type: "string",
          required: true,
          description: "The slug of the shortened URL",
        },
        {
          name: "period",
          type: "string",
          required: false,
          description: "Time period (day, week, month, year)",
        },
      ],
      responses: [
        {
          status: 200,
          description: "Returns analytics data",
          example:
            '{"clicks": 42, "unique": 38, "referrers": {"google.com": 12, "twitter.com": 8, ...}, "countries": {"US": 15, "IN": 8, ...}, "devices": {"mobile": 25, "desktop": 17}}',
        },
        {
          status: 404,
          description: "Not found, link doesn't exist",
          example: '{"error": "Link not found"}',
        },
      ],
    },
  ];

  // API pricing tiers
  const apiPricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Try out the API with limited requests",
      features: [
        "50 API requests per day",
        "Basic rate limiting",
        "Standard support",
        "Public documentation",
      ],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For developers and small applications",
      features: [
        "5,000 API requests per day",
        "Priority rate limiting",
        "Email support",
        "Advanced analytics",
        "Custom domains",
      ],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large-scale applications",
      features: [
        "Unlimited API requests",
        "Dedicated infrastructure",
        "SLA guarantees",
        "24/7 support",
        "Custom integration assistance",
        "White-labeled solutions",
      ],
      cta: "Contact Us",
      highlight: false,
    },
  ];

  const copyToClipboard = (text: string, endpointId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpointId);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />

      <div className="pt-25 flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LinkSnip API
            </motion.h1>
            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Integrate powerful URL shortening into your applications
            </motion.p>
          </div>

          {/* API Tab Navigation */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="flex space-x-2 p-1 rounded-lg bg-white/5 backdrop-blur-sm">
              {["overview", "documentation", "pricing", "authentication"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md transition-colors ${
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

          {/* Tab Content */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  API Overview
                </h2>

                <div className="space-y-6 text-white/80">
                  <p>
                    The LinkSnip API enables developers to integrate URL
                    shortening functionality directly into their applications.
                    With our robust set of endpoints, you can programmatically
                    create, manage, and track shortened links.
                  </p>

                  <div className="p-6 bg-purple-900/30 rounded-xl border border-purple-500/20">
                    <h3 className="text-xl font-medium text-white mb-4">
                      Quick Start
                    </h3>
                    <ol className="list-decimal list-inside space-y-3">
                      <li>Sign up for a LinkSnip account</li>
                      <li>Generate an API key in your dashboard</li>
                      <li>
                        Make your first API request using the code examples
                        provided
                      </li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {[
                      "Fast & Reliable",
                      "Detailed Analytics",
                      "Custom Links",
                      "Secure",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="p-4 bg-white/5 rounded-lg flex items-center gap-3"
                      >
                        <div className="bg-purple-500/20 p-2 rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-purple-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <p>
                    Ready to start? Check out the{" "}
                    <button
                      onClick={() => setActiveTab("documentation")}
                      className="text-purple-300 hover:underline"
                    >
                      API Documentation
                    </button>{" "}
                    or view our{" "}
                    <button
                      onClick={() => setActiveTab("pricing")}
                      className="text-purple-300 hover:underline"
                    >
                      API Pricing
                    </button>
                    .
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "documentation" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  API Documentation
                </h2>

                <div className="mb-8 text-white/80">
                  <p>
                    Our RESTful API provides several endpoints to help you
                    manage shortened URLs programmatically. All requests should
                    be made to{" "}
                    <code className="bg-black/30 px-2 py-1 rounded text-pink-300">
                      https://linksnip.site/api
                    </code>
                    .
                  </p>
                </div>

                {endpoints.map((endpoint) => (
                  <div
                    key={endpoint.id}
                    className="mb-12 pb-8 border-b border-white/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {endpoint.description}
                      </h3>
                      <div className="flex items-center mt-2 md:mt-0 space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            endpoint.method === "GET"
                              ? "bg-green-500/20 text-green-300"
                              : endpoint.method === "POST"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="bg-black/30 px-2 py-1 rounded text-pink-300">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>

                    {endpoint.parameters.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-white text-lg mb-2">Parameters</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white/5 rounded-lg overflow-hidden">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="px-4 py-3 text-left text-sm font-medium text-white/80">
                                  Parameter
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-white/80">
                                  Type
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-white/80">
                                  Required
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-white/80">
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param) => (
                                <tr
                                  key={param.name}
                                  className="border-b border-white/5"
                                >
                                  <td className="px-4 py-3 text-sm text-white">
                                    {param.name}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-purple-300">
                                    {param.type}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {param.required ? (
                                      <span className="text-red-300">Yes</span>
                                    ) : (
                                      <span className="text-gray-400">No</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-white/80">
                                    {param.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-white text-lg mb-2">
                        Example Request
                      </h4>
                      <div className="relative">
                        <SyntaxHighlighter
                          language="javascript"
                          style={atomDark}
                          customStyle={{
                            borderRadius: "8px",
                            padding: "16px",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          {endpoint.example}
                        </SyntaxHighlighter>
                        <button
                          onClick={() =>
                            copyToClipboard(endpoint.example, endpoint.id)
                          }
                          className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                          title="Copy to clipboard"
                        >
                          {copiedEndpoint === endpoint.id ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white/70"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white text-lg mb-2">Responses</h4>
                      <div className="space-y-4">
                        {endpoint.responses.map((response) => (
                          <div
                            key={response.status}
                            className="bg-white/5 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <span
                                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                    response.status < 300
                                      ? "bg-green-400"
                                      : response.status < 400
                                      ? "bg-blue-400"
                                      : "bg-red-400"
                                  }`}
                                ></span>
                                <span className="font-mono font-medium text-white">
                                  {response.status}
                                </span>
                              </div>
                              <span className="text-sm text-white/60">
                                {response.description}
                              </span>
                            </div>
                            <SyntaxHighlighter
                              language="json"
                              style={atomDark}
                              customStyle={{
                                borderRadius: "8px",
                                padding: "12px",
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                margin: 0,
                              }}
                            >
                              {response.example}
                            </SyntaxHighlighter>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "pricing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  API Pricing
                </h2>

                <p className="text-white/80 mb-8">
                  Choose the API plan that best fits your needs. All plans
                  include access to our core API functionality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {apiPricingTiers.map((tier, index) => (
                    <motion.div
                      key={tier.name}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                      {tier.highlight && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full z-10">
                          Most Popular
                        </div>
                      )}

                      <div
                        className={`h-full rounded-2xl overflow-hidden backdrop-blur-md relative ${
                          tier.highlight
                            ? "border-2 border-pink-500/20 mt-4"
                            : "border border-white/20"
                        }`}
                      >
                        {/* Glassmorphism highlight effect */}
                        <div className="absolute -top-[250%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-br from-white/40 via-white/5 to-transparent rotate-12 pointer-events-none"></div>

                        {/* Background tint based on tier */}
                        <div
                          className={`relative bg-white/10 p-8 flex flex-col h-full ${
                            tier.highlight ? "bg-purple-500/50" : ""
                          }`}
                        >
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {tier.name}
                          </h3>

                          <div className="mb-6">
                            <span className="text-4xl font-bold text-white">
                              {tier.price}
                            </span>
                            <span className="text-white/60 ml-2">
                              {tier.period}
                            </span>
                          </div>

                          <p className="text-white/80 mb-6">
                            {tier.description}
                          </p>

                          <ul className="mb-8 space-y-3 flex-grow">
                            {tier.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-center text-white/70"
                              >
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
                              tier.highlight
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

                <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl text-white/80">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Rate Limiting
                  </h3>
                  <p className="mb-4">
                    Our API implements rate limiting to ensure fair usage and
                    stability of our services. Rate limits vary by plan:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <span className="font-medium text-white">Free:</span> 50
                      requests per day, max 5 per minute
                    </li>
                    <li>
                      <span className="font-medium text-white">Pro:</span> 5,000
                      requests per day, max 100 per minute
                    </li>
                    <li>
                      <span className="font-medium text-white">
                        Enterprise:
                      </span>{" "}
                      Custom limits based on your needs
                    </li>
                  </ul>
                  <p className="mt-4">
                    If you exceed your rate limit, you&apos;ll receive a{" "}
                    <code className="bg-black/30 px-2 py-1 rounded text-pink-300">
                      429 Too Many Requests
                    </code>{" "}
                    response.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "authentication" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Authentication
                </h2>

                <div className="space-y-6 text-white/80">
                  <p>
                    The LinkSnip API uses API key authentication. You must
                    include your API key in all requests to the API as a bearer
                    token in the Authorization header.
                  </p>

                  <div className="p-6 bg-purple-900/30 rounded-xl border border-purple-500/20">
                    <h3 className="text-xl font-medium text-white mb-4">
                      Getting Your API Key
                    </h3>
                    <ol className="list-decimal list-inside space-y-3">
                      <li>Sign in to your LinkSnip account</li>
                      <li>Navigate to Dashboard &rarr; Settings &rarr; API</li>
                      <li>Generate a new API key</li>
                      <li>Copy your API key and store it securely</li>
                    </ol>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-medium text-white mb-4">
                      Using Your API Key
                    </h3>

                    <p className="mb-4">
                      Include your API key in all requests with the following
                      header:
                    </p>

                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      customStyle={{
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {`headers: {
  'Authorization': 'Bearer YOUR_API_KEY'
}`}
                    </SyntaxHighlighter>
                  </div>

                  <div className="mt-8 p-4 bg-yellow-400/20 rounded-lg border border-yellow-500/30 text-yellow-200">
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium mb-1">Security Warning</h4>
                        <p>
                          Never expose your API key in client-side code. Always
                          make API requests from your server.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-medium text-white mb-4">
                      API Key Management
                    </h3>
                    <p>Best practices for managing your API keys:</p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>Rotate keys periodically</li>
                      <li>Use different keys for development and production</li>
                      <li>Revoke compromised keys immediately</li>
                      <li>Set appropriate permissions for each key</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Get Started Section */}
          <motion.div
            className="text-center p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Sign up today and start using the LinkSnip API to enhance your
              applications with powerful URL shortening
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:brightness-110 transition-all"
            >
              Create API Key
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
