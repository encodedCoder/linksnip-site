import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Define the auth options without exporting
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin", // Updated path to match your actual signin page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Create and export the handler directly
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
