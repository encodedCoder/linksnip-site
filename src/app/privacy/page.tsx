"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="pt-25 min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h1 className="text-3xl font-bold text-white mb-6">
              Privacy Policy
            </h1>

            <div className="prose prose-invert prose-sm prose-pink max-w-none opacity-90">
              <p>Last Updated: December 1, 2023</p>

              <h2>1. Introduction</h2>
              <p>
                Welcome to LinkSnip. We respect your privacy and are committed
                to protecting your personal data. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you use our link shortening service.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>2.1 Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide
                when creating an account or using our services:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Account credentials</li>
                <li>Profile information</li>
              </ul>

              <h3>2.2 Usage Data</h3>
              <p>
                We automatically collect certain information when you visit,
                use, or navigate our service:
              </p>
              <ul>
                <li>IP address</li>
                <li>Device and browser information</li>
                <li>Pages or links visited</li>
                <li>Time spent on the service</li>
                <li>Click-through data</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes:</p>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To create and manage your account</li>
                <li>To track and analyze shortened link usage</li>
                <li>To improve our service and user experience</li>
                <li>To communicate with you</li>
                <li>To ensure the security of our service</li>
              </ul>

              <h2>4. Data Sharing and Disclosure</h2>
              <p>
                We may share your information with third parties in certain
                circumstances:
              </p>
              <ul>
                <li>With service providers who help us operate our service</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>
                  In connection with a business transaction (e.g., merger or
                  acquisition)
                </li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the internet or electronic storage is 100% secure.
              </p>

              <h2>6. Your Data Protection Rights</h2>
              <p>Depending on your location, you may have rights to:</p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
              </ul>

              <h2>7. Children&apos;s Privacy</h2>
              <p>
                Our service is not directed to children under 13. We do not
                knowingly collect personal information from children under 13.
              </p>

              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
                <a
                  href="mailto:privacy@linksnip.com"
                  className="text-pink-400 hover:text-pink-300"
                >
                  privacy@linksnip.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
