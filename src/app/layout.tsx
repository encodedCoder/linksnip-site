import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Configure Mulish font
const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "LinkSnip by Suresh",
  description:
    "The best link shortener and management tool. Easily create, manage, and share your links with LinkSnip.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mulish.variable}>
      <body className="font-mulish">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
