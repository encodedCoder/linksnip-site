"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
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
              Terms of Service
            </h1>

            <div className="prose prose-invert prose-sm prose-pink max-w-none opacity-90">
              <p>Last Updated: December 1, 2023</p>

              <h2>1. Introduction</h2>
              <p>
                Welcome to LinkSnip! These Terms of Service (&quot;Terms&quot;)
                govern your use of our website, services, and applications
                (collectively, the &quot;Service&quot;). By using the Service,
                you agree to these Terms. If you disagree with any part of the
                Terms, please do not use our Service.
              </p>

              <h2>2. User Accounts</h2>
              <p>
                When you create an account with us, you guarantee that the
                information you provide is accurate, complete, and current at
                all times. Inaccurate, incomplete, or obsolete information may
                result in the immediate termination of your account.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your
                account and password, including but not limited to restricting
                access to your computer and/or account. You agree to accept
                responsibility for any and all activities that occur under your
                account and/or password.
              </p>

              <h2>3. Acceptable Use</h2>
              <p>You agree not to use LinkSnip to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>
                  Infringe upon or violate our intellectual property rights or
                  the intellectual property rights of others
                </li>
                <li>
                  Transmit or upload any material that contains viruses, trojan
                  horses, or other harmful code
                </li>
                <li>Harass, abuse, or harm another person or group</li>
                <li>
                  Distribute unsolicited or unauthorized advertising or
                  promotional material
                </li>
                <li>
                  Interfere with or disrupt the Service or servers or networks
                  connected to the Service
                </li>
                <li>Collect or track the personal information of others</li>
                <li>
                  Shorten links to content that is illegal, offensive, or
                  violates third-party rights
                </li>
              </ul>

              <h2>4. Content Restrictions</h2>
              <p>
                LinkSnip prohibits the use of our service for shortening links
                to content that:
              </p>
              <ul>
                <li>Is illegal or promotes illegal activities</li>
                <li>Is sexually explicit or pornographic</li>
                <li>Promotes violence or discrimination</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains malware, viruses, or harmful code</li>
                <li>Is deceptive or fraudulent</li>
                <li>Violates the privacy of others</li>
              </ul>
              <p>
                We reserve the right to remove any shortened links that violate
                these restrictions.
              </p>

              <h2>5. Service Modifications</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or
                permanently, the Service (or any part thereof) with or without
                notice. We shall not be liable to you or to any third party for
                any modification, suspension, or discontinuance of the Service.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>
                In no event shall LinkSnip, its directors, employees, partners,
                agents, suppliers, or affiliates be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from your access
                to or use of or inability to access or use the Service.
              </p>

              <h2>7. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the
                Service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever, including
                without limitation if you breach the Terms.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with
                the laws, without regard to its conflict of law provisions.
              </p>

              <h2>9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will
                provide notice of changes by updating the &quot;Last
                Updated&quot; date at the top of these Terms. Your continued use
                of the Service after any such changes constitutes your
                acceptance of the new Terms.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
                <a
                  href="mailto:terms@linksnip.com"
                  className="text-pink-400 hover:text-pink-300"
                >
                  terms@linksnip.com
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
